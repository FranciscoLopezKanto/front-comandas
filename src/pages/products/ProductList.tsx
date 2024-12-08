import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/system";
import axios from "axios";
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Obtener productos desde la API
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/product");
      console.log("Productos obtenidos:", response.data.data); // Verifica que los datos son correctos
      setProducts(response.data.data); // Asegúrate de que `data` contiene los productos
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const payload = {
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        description: newProduct.description,
        category: newProduct.category,
      };

      const response = await axios.post("http://localhost:3000/product", payload);
      setProducts((prevProducts) => [...prevProducts, response.data.data]);
      setNotification("Producto agregado exitosamente");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setNotification("Error al agregar el producto");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      setNotification("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setNotification("Error al eliminar el producto");
    }
  };

  const handleCloseNotification = () => {
    setNotification("");
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando productos...
        </Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6">No hay productos disponibles.</Typography>
      </Box>
    );
  }

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
                <TableCell>ID</TableCell>
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
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>CLP${product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell align="right">
                    <OrangeButton size="small" onClick={() => handleDeleteProduct(product.id)}>
                      Eliminar
                    </OrangeButton>
                  </TableCell>
                </TableRow>
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

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseNotification} severity="success" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ProductList;
