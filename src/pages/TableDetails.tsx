import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Typography, Box, Paper } from '@mui/material';
import styles from './TableDetails.module.css';

type Product = {
  id: number;
  name: string;
  price: number;
  comment?: string; // El comentario será opcional
};

export function TableDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentComment, setCurrentComment] = useState<string>('');
  const [isCommenting, setIsCommenting] = useState<number | null>(null); // Track the product being commented on

  const menu = [
    { id: 1, name: 'Pizza', price: 12000 },
    { id: 2, name: 'Pasta', price: 10000 },
    { id: 3, name: 'Bebida', price: 5000 },
  ];

  const addProduct = (product: Product) => {
    setProducts((prev) => [
      ...prev,
      { ...product, comment: '' }, // Agregamos el producto con un comentario vacío
    ]);
    setIsCommenting(product.id); // Marcar el producto como el que está siendo comentado
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentComment(e.target.value);
  };

  const handleCommentSubmit = (productId: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, comment: currentComment } : product
      )
    );
    setCurrentComment(''); // Limpiar el comentario después de enviarlo
    setIsCommenting(null); // Resetear el estado de comentario
  };

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom>
        Mesa {id}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver a Mesas
      </Button>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Comanda
      </Typography>

      <List>
        {products.map((product, index) => (
          <ListItem key={index} disablePadding>
            <Paper sx={{ width: '100%', padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'column' }}>
              <ListItemText
                primary={`${product.name} - CLP$${product.price.toLocaleString()}`}
                secondary={`Comentario: ${product.comment || 'Sin comentario'}`}
              />
            </Paper>

            {/* Mostrar el campo de comentario si el producto está siendo comentado */}
            {isCommenting === product.id && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                <TextField
                  label="Agregar comentario (ej. sin hielo)"
                  variant="outlined"
                  value={currentComment}
                  onChange={handleCommentChange}
                  fullWidth
                  sx={{ marginBottom: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCommentSubmit(product.id)}
                >
                  Agregar Comentario
                </Button>
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Total: CLP${total.toLocaleString()}
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 3 }}>
        Menú
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {menu.map((product) => (
          <Box key={product.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addProduct(product)}
              sx={{ marginBottom: 1, width: '100%' }}
            >
              {product.name} - CLP${product.price.toLocaleString()}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
