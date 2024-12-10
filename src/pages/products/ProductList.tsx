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
  TextField,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material"; // Ícono de eliminación
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<number | "">("");
  const [newPrice, setNewPrice] = useState<number | "">("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Obtener productos desde la API
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/product");
      const sortedProducts = response.data.data.sort((a: Product, b: Product) => a.id - b.id);
      setProducts(sortedProducts);
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

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    try {
      const updatedProduct = {
        product: selectedProduct.name,
        newnameProduct: selectedProduct.name,
        newPrice: newPrice || selectedProduct.price,
        newStock: newStock || selectedProduct.stock,
        newDescription: selectedProduct.description,
        newCategory: selectedProduct.category,
      };

      await axios.put("http://localhost:3000/product", updatedProduct);

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, price: newPrice || selectedProduct.price, stock: newStock || selectedProduct.stock }
            : product
        )
      );

      setNotification("Producto actualizado exitosamente");
      setIsUpdateModalOpen(false);
      setNewStock("");
      setNewPrice("");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setNotification("Error al actualizar el producto");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      setNotification("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
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

      <Box
        sx={{
          maxHeight: "450px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          mt: 2,
        }}
      >
        {isMobile ? (
          products.map((product) => (
            <StyledMobileCard key={product.id}>
              <Typography variant="h6" color="primary">
                {product.name}
              </Typography>
              <Typography variant="body2">Categoría: {product.category}</Typography>
              <Typography variant="body2">Precio: CLP${product.price.toLocaleString()}</Typography>
              <Typography variant="body2">Descripción: {product.description}</Typography>
              <Typography variant="body2">Stock: {product.stock}</Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <OrangeButton
                  size="small"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsUpdateModalOpen(true);
                  }}
                >
                  Actualizar Producto
                </OrangeButton>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDeleteProduct(product.id)}
                  startIcon={<Delete />}
                >
                  Eliminar
                </Button>
              </Box>
            </StyledMobileCard>
          ))
        ) : (
          <StyledTableContainer>
            <Table stickyHeader>
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
                      <OrangeButton
                        size="small"
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        Actualizar Producto
                      </OrangeButton>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                        startIcon={<Delete />}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </Box>

      <ProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleAddProduct} />

      {selectedProduct && (
        <ProductModal
          open={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onConfirm={handleUpdateProduct}
          product={selectedProduct}
          isUpdate
        />
      )}

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
