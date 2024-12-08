import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import ProductItem from "./ProductItem";
import ProductModal from "./AddProductModal";
import {
  StyledContainer,
  StyledMobileCard,
  StyledTableContainer,
  StyledTitle,
  OrangeButton,
} from "./styles";

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: number;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Pizza",
    category: "Comida",
    price: 12000,
    description: "Pizza de queso con orilla rellena",
    stock: 10,
  },
  {
    id: 2,
    name: "Pasta",
    category: "Comida",
    price: 10000,
    description: "Pasta con salsa boloñesa",
    stock: 15,
  },
  {
    id: 3,
    name: "Bebida",
    category: "Bebidas",
    price: 5000,
    description: "Coca-Cola 1L",
    stock: 20,
  },
];

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, { ...newProduct, id: prevProducts.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  return (
    <StyledContainer>
      <StyledTitle variant="h4" gutterBottom>
        Ver Productos
      </StyledTitle>

      <OrangeButton onClick={() => setIsModalOpen(true)}>Agregar Producto</OrangeButton>

      {isMobile ? (
        <>
          {products.map((product) => (
            <StyledMobileCard key={product.id}>
              <Typography variant="h6" color="primary">
                {product.name}
              </Typography>
              <Typography variant="body2">Categoría: {product.category}</Typography>
              <Typography variant="body2">Precio: CLP${product.price.toLocaleString()}</Typography>
              <Typography variant="body2">Descripción: {product.description}</Typography>
              <Typography variant="body2">Stock: {product.stock}</Typography>
              <OrangeButton size="small" onClick={() => handleDeleteProduct(product.id)}>
                Eliminar
              </OrangeButton>
            </StyledMobileCard>
          ))}
        </>
      ) : (
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteProduct}
                />
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}

      <ProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddProduct}
      />
    </StyledContainer>
  );
};

export default ProductList;
