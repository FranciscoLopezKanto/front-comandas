import { Button, TextField, Box, Typography, Modal } from '@mui/material';
import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  comment?: string;
};

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (product: Product) => void;
  selectedProduct: Product | null;
};

export default function ProductModal({ open, onClose, onConfirm, selectedProduct }: ProductModalProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [currentComment, setCurrentComment] = useState<string>('');

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(selectedProduct.quantity || 1);
      setCurrentComment(selectedProduct.comment || '');
    }
  }, [open, selectedProduct]);

  const handleConfirm = () => {
    if (selectedProduct) {
      const updatedProduct = { ...selectedProduct, quantity, comment: currentComment };
      onConfirm(updatedProduct);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {selectedProduct?.name || 'Producto'}
        </Typography>
        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Comentario (opcional)"
          value={currentComment}
          onChange={(e) => setCurrentComment(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
