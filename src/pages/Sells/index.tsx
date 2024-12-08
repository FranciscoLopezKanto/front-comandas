import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { StyledBox, StyledTypography, StyledGridContainer, StyledGridItem } from './styles';

const dailySalesData = [
  { day: 'Lunes', sales: 20000 },
  { day: 'Martes', sales: 45000 },
  { day: 'Miércoles', sales: 32000 },
  { day: 'Jueves', sales: 50000 },
  { day: 'Viernes', sales: 38000 },
  { day: 'Sábado', sales: 62000 },
  { day: 'Domingo', sales: 40000 },
];

const monthlySalesData = [
  { month: 'Enero', sales: 450000 },
  { month: 'Febrero', sales: 520000 },
  { month: 'Marzo', sales: 610000 },
  { month: 'Abril', sales: 480000 },
  { month: 'Mayo', sales: 590000 },
  { month: 'Junio', sales: 700000 },
  { month: 'Julio', sales: 620000 },
  { month: 'Agosto', sales: 670000 },
  { month: 'Septiembre', sales: 540000 },
  { month: 'Octubre', sales: 580000 },
  { month: 'Noviembre', sales: 620000 },
  { month: 'Diciembre', sales: 730000 },
];

export function SalesChart() {
  const totalDailySales = dailySalesData.reduce((total, item) => total + item.sales, 0);
  const averageDailySales = totalDailySales / dailySalesData.length;
  const totalMonthlySales = monthlySalesData.reduce((total, item) => total + item.sales, 0);
  const averageMonthlySales = totalMonthlySales / monthlySalesData.length;

  return (
    <StyledBox>
      <StyledTypography variant="h4">Gráficos de Ventas</StyledTypography>
      <StyledGridContainer container spacing={3}>
        <StyledGridItem item xs={12} md={6}>
          <StyledTypography variant="h5">Ventas Diarias</StyledTypography>
          <StyledTypography variant="subtitle1">
            Promedio de Ventas Diarias: CLP${averageDailySales.toFixed(0).toLocaleString()}
          </StyledTypography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </StyledGridItem>
        <StyledGridItem item xs={12} md={6}>
          <StyledTypography variant="h5">Ventas Mensuales</StyledTypography>
          <StyledTypography variant="subtitle1">
            Promedio de Ventas Mensuales: CLP${averageMonthlySales.toFixed(0).toLocaleString()}
          </StyledTypography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </StyledGridItem>
      </StyledGridContainer>
    </StyledBox>
  );
}
