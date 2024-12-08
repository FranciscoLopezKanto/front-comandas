import styled from "styled-components";
import { Box, Button, Typography } from "@mui/material";

export const StyledContainer = styled(Box)`
  padding: 16px;
  background-color: #fafafa;
  gap: 16px;
  margin-top: 80px;
  height: 100vh; 
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  button {
    width: 80%;
    margin: 0 auto;
  }
`;

export const StyledTitle = styled(Typography)`
  color: #ff6f00; /* Estilo anaranjado tipo Fudo */
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

export const StyledTableContainer = styled(Box)`
  margin-top: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const StyledMobileCard = styled(Box)`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  & h6 {
    margin-bottom: 8px;
  }

  & button {
    margin-top: 8px;
    width: 100%; /* Botón ancho completo para móviles */
  }
`;

export const OrangeButton = styled(Button)`
  background-color: #ff6f00;
  color: white;
  &:hover {
    background-color: #e65c00;
  }
  border-radius: 8px;
  text-transform: none;
`;
