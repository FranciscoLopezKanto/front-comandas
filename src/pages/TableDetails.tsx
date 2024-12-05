import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './TableDetails.module.css';

type Product = {
  id: number;
  name: string;
  price: number;
};

export function TableDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const menu = [
    { id: 1, name: 'Pizza', price: 12 },
    { id: 2, name: 'Pasta', price: 10 },
    { id: 3, name: 'Bebida', price: 5 },
  ];

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const total = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className={styles.container}>
      <h1>Mesa {id}</h1>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        Volver a Mesas
      </button>
      <h2>Comanda</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <h2>Menú</h2>
      <div className={styles.menu}>
        {menu.map((product) => (
          <button
            key={product.id}
            className={styles.menuItem}
            onClick={() => addProduct(product)}
          >
            {product.name} - ${product.price}
          </button>
        ))}
      </div>
    </div>
  );
}
