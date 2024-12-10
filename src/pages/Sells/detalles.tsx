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

const Details: React.FC = () => {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch('http://localhost:3000/product'),
          fetch('http://localhost:3000/order'),
        ]);

        if (!productsRes.ok || !ordersRes.ok) {
          throw new Error('Error al obtener los datos');
        }

        const products = await productsRes.json();
        const orders = await ordersRes.json();

        const productConsumption: Record<number, number> = {};

        orders.data.forEach((order: any) => {
          const { product_id, quantity } = order;
          productConsumption[product_id] = (productConsumption[product_id] || 0) + quantity;
        });

        const ranking = products.data
        .map((product: any) => ({
          ...product,
          totalConsumed: productConsumption[product.id] || 0,
        }))
        .sort((a: any, b: any) => b.totalConsumed - a.totalConsumed);

        setRanking(ranking);
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
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
  );
};

export default Details;
