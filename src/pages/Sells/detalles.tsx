import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Box,
} from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los elementos necesarios para los gráficos
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface CategoryData {
  category: string;
  totalSold: number;
}

interface TableData {
  tableNumber: number;
  totalAmount: number;
}

const Details: React.FC = () => {
  const [ranking, setRanking] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [tableRanking, setTableRanking] = useState<TableData[]>([]); // Estado para las mesas
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:3000/product'),
          fetch('http://localhost:3000/order/orders'), // API de órdenes
        ]);

        if (!productsRes.ok || !ordersRes.ok) {
          throw new Error('Error al obtener los datos');
        }

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        // Inicializar las mesas con su totalAmount en 0
        const initialTables: TableData[] = Array.from({ length: 9 }, (_, i) => ({
          tableNumber: i + 1,
          totalAmount: 0,
        }));

        // Agrupar el totalAmount por mesa
        orders.data.forEach((order: any) => {
          const tableIndex = initialTables.findIndex((table) => table.tableNumber === order.table_number);
          if (tableIndex >= 0) {
            initialTables[tableIndex].totalAmount += order.total_amount; // Sumar total por mesa
          }
        });

        // Ordenar las mesas por el totalAmount generado
        const sortedTableRanking = [...initialTables].sort((a, b) => b.totalAmount - a.totalAmount);

        // Crear ranking de productos más vendidos
        const productConsumption: Record<number, number> = {};
        orders.data.forEach((order: any) => {
          order.items.forEach((item: any) => {
            const { product_id, quantity } = item;
            productConsumption[product_id] = (productConsumption[product_id] || 0) + quantity;
          });
        });

        const ranking = products.data
          .map((product: any) => ({
            ...product,
            totalConsumed: productConsumption[product.id] || 0,
          }))
          .sort((a: any, b: any) => b.totalConsumed - a.totalConsumed);

        // Crear datos para el gráfico de torta por categoría
        const categorySales: Record<string, number> = {};
        products.data.forEach((product: any) => {
          const category = product.category;
          const totalSold = productConsumption[product.id] || 0;
          categorySales[category] = (categorySales[category] || 0) + totalSold;
        });

        const categoryData = Object.entries(categorySales).map(([category, totalSold]) => ({
          category,
          totalSold,
        }));

        setTableRanking(sortedTableRanking);
        setRanking(ranking);
        setCategoryData(categoryData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Preparar los datos para el gráfico de torta
  const pieChartData = {
    labels: categoryData.map((item) => item.category),
    datasets: [
      {
        data: categoryData.map((item) => item.totalSold),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'],
      },
    ],
  };

  // Preparar los datos para el gráfico de barras (ranking de mesas)
  const barChartData = {
    labels: tableRanking.map((table) => `Mesa ${table.tableNumber}`),
    datasets: [
      {
        label: 'Total Generado',
        data: tableRanking.map((table) => table.totalAmount),
        backgroundColor: '#4BC0C0',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={3} display="flex" flexDirection="column" gap={4} mt={6}>
      <Box display="flex" justifyContent="space-between" gap={4}>
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            Ranking de Productos Más Consumidos
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Producto
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Categoría
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Cantidad Consumida
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranking.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell align="left">{product.name}</TableCell>
                    <TableCell align="left">{product.category}</TableCell>
                    <TableCell align="center">{product.totalConsumed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={6}
        >
          <Typography variant="h5" gutterBottom>
            Categorías Más Vendidas
          </Typography>
          <Box
            width="95%"
            height={400}
            marginLeft="20px"
            marginRight="20px"
            display="flex"
            justifyContent="center"
          >
            <Pie data={pieChartData} options={{ responsive: true }} />
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" gap={4}>
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            Ranking de Mesas Más Usadas
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                    Mesa
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Total Generado
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableRanking.map((table) => (
                  <TableRow key={table.tableNumber} hover>
                    <TableCell align="left">{`Mesa ${table.tableNumber}`}</TableCell>
                    <TableCell align="center">${table.totalAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={6}
        >
          <Typography variant="h5" gutterBottom>
            Total Generado por Mesa
          </Typography>
          <Box
            width="95%"
            height={400}
            marginLeft="20px"
            marginRight="20px"
            display="flex"
            justifyContent="center"
          >
            <Bar data={barChartData} options={{ responsive: true }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
