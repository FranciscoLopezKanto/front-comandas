import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { OrangeButton } from "./styles";
import { Product } from "./ProductList";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
};

const categories = ["Bebida", "Comida", "Entrada", "Principal", "Postre"]; // Categorías actualizadas

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleConfirm = () => {
    if (!name || !category || !price || !stock || !description) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const newProduct: Product = {
      id: 0, // Se asignará en la lista principal
      name,
      category,
      price: Number(price),
      description,
      stock: Number(stock),
    };

    onConfirm(newProduct);

    // Reiniciar los campos después de confirmar
    setName("");
    setPrice("");
    setStock("");
    setDescription("");
    setCategory("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#FF7F50" }}>
          Agregar Producto
        </Typography>

        {/* Campo: Nombre */}
        <TextField
          label="Nombre del Producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />

        {/* Campo: Precio */}
        <TextField
          label="Precio (CLP)"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || "")}
          fullWidth
          sx={{ mb: 2 }}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />

        {/* Campo: Stock */}
        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value) || "")}
          fullWidth
          sx={{ mb: 2 }}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />

        {/* Campo: Descripción */}
        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        />

        {/* Campo: Categoría */}
        <TextField
          select
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
          InputProps={{
            style: { backgroundColor: "white" },
          }}
        >
          {categories.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
          <OrangeButton onClick={handleConfirm}>Agregar</OrangeButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
