import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  gap: theme.spacing(5), 
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(4.5), 
  },
}));

export const StyledGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  maxWidth: 'calc(50% - 16px)', 
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  },
}));
