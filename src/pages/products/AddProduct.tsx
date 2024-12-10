import React, { useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

export const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['Bebida', 'Comida', 'Entrada', 'Principal', 'Postre']; // Ejemplo de categorías

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      price: Number(price),
      stock: Number(stock),
      description,
      category,
    };

    try {
      const response = await axios.post('http://localhost:3000/product', payload);
      alert('Producto agregado exitosamente');
      setName('');
      setPrice('');
      setStock('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al agregar el producto');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Agregar Producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} width="100%" maxWidth={400}>
        <TextField
          label="Nombre del Producto"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Precio"
          variant="outlined"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          fullWidth
          required
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Stock"
          variant="outlined"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          fullWidth
          required
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={3}
          required
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        />
        <TextField
          label="Categoría"
          variant="outlined"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          select
          fullWidth
          required
          InputProps={{
            style: { backgroundColor: 'white' },
          }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Agregar Producto
        </Button>
      </Box>
    </Box>
  );
};
