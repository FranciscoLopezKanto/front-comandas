import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { OrangeButton } from "./styles";
import { Product } from "./ProductList";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
};

const categoryOptions = ["Entrada", "Principal", "Bebidas"];

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number | "">("");

  const handleConfirm = () => {
    if (!name || !category || !price || !stock) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    onConfirm({
      id: 0, // Este ID será generado por la lista
      name,
      category,
      price: Number(price),
      description,
      stock: Number(stock),
    });

    // Reinicia los campos después de confirmar
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setStock("");
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

        <TextField
          label="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <TextField
          select
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          required
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Precio (CLP)"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value) || "")}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <TextField
          label="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value) || "")}
          fullWidth
          sx={{ mb: 2 }}
          required
        />

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
