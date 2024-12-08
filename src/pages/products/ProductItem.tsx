import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Product } from "./ProductList";

type ProductItemProps = {
  product: Product;
  onDelete?: (id: number) => void; // Opción para eliminar el producto
};

const ProductItem: React.FC<ProductItemProps> = ({ product, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>CLP${product.price.toLocaleString()}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.stock}</TableCell>
      {onDelete && (
        <TableCell align="right">
          <IconButton
            color="error"
            onClick={() => onDelete(product.id)}
            aria-label="Eliminar producto"
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
};

export default ProductItem;
