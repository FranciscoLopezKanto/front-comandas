// import { List, ListItem, ListItemText, Paper, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Product } from '../../../products/ProductList';


// type ProductListProps = {
//   products: Product[];
//   onDelete: (index: number) => void;
// };

// export default function ProductList({ products, onDelete }: ProductListProps) {
//   return (
//     <List>
//       {products.map((product, index) => (
//         <ListItem key={index} disablePadding>
//           <Paper sx={{ width: '100%', padding: 2, marginBottom: 2 }}>
//             <ListItemText
//               // primary={`${product.name} x${product.quantity} - CLP$${(product.price * product.quantity).toLocaleString()}`}
//               // secondary={`Comentario: ${product.comment || 'Sin comentario'}`}
//             />
//             <IconButton onClick={() => onDelete(index)} sx={{ float: 'right' }}>
//               <DeleteIcon color="error" />
//             </IconButton>
//           </Paper>
//         </ListItem>
//       ))}
//     </List>
//   );
// }
