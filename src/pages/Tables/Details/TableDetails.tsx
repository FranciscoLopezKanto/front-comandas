import { useState } from "react";
import {
  Button,
  Switch,
  Typography,
  Box,
  Grid,
  FormControlLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ProductModal from "./modal/ProductModal";
import ProductList from "./list/index";
import ConfirmationModal from "./modal/ConfirmationModal";

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  comment?: string;
};

export function TableDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const menu = [
    { id: 1, name: "Pizza", price: 12000, quantity: 1 },
    { id: 2, name: "Pasta", price: 10000, quantity: 1 },
    { id: 3, name: "Bebida", price: 5000, quantity: 1 },
  ];

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmProduct = (product: Product) => {
    setProducts((prev) => {
      const existingProductIndex = prev.findIndex((p) => p.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex] = product;
        return updatedProducts;
      }
      return [...prev, product];
    });
  };

  const handleDeleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTogglePaid = () => {
    setIsPaid(true); // Marcar como pagado
    setProducts([]); // Limpiar todos los productos
    setIsPaymentModalOpen(false); // Cerrar el modal

    // Redirigir al home después de 1 segundo
    setTimeout(() => {
      navigate("/"); 
    }, 1000);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Mesa {id}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Comanda
      </Typography>
      {/* Switch para marcar como pagado */}
      <FormControlLabel
        control={
          <Switch
            checked={isPaid}
            onChange={() => setIsPaymentModalOpen(true)} // Abrir el modal de confirmación
            disabled={isPaid} // No permitir cambiar si ya está pagado
          />
        }
        label={isPaid ? "Pagado" : "Sin pagar"}
      />

      {/* Modal de confirmación */}
      <ConfirmationModal
        open={isPaymentModalOpen}
        title="Confirmar acción"
        message="¿Estás seguro de marcar esta mesa como pagada? Esto eliminará todos los productos asociados."
        onConfirm={handleTogglePaid}
        onCancel={() => setIsPaymentModalOpen(false)}
      />

      <ProductList products={products} onDelete={handleDeleteProduct} />

      <Typography variant="h6">
        Total: CLP$
        {products.reduce(
          (sum, product) => sum + product.price * product.quantity,
          0
        ).toLocaleString()}
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Menú
      </Typography>

      <Grid container spacing={2}>
        {menu.map((product) => (
          <Grid item xs={12} sm={4} key={product.id}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleOpenModal(product)}
              fullWidth
            >
              {product.name} - CLP${product.price.toLocaleString()}
            </Button>
          </Grid>
        ))}
      </Grid>

      <ProductModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmProduct}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
}
