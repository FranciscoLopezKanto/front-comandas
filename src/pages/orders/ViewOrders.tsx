import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface OrderItem {
  id: number;
  product_id: number;
  product: Product;
  quantity: number;
  total_price: number;
  table_number: number;
}

interface Order {
  id: number;
  user_id: number;
  table_number: number;
  items: OrderItem[];
  order_date: string;
  total_amount: number;
  estado: string;
}

const Container = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  margin-top: 80px; /* Ajusta este valor según la altura de tu navbar */
  background-color: #f9f9f9;
  min-height: 100vh;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  select {
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
  }
`;

const OrderCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px auto;
  max-width: 600px;

  h3 {
    margin-bottom: 10px;
    color: #444;
  }

  p {
    margin: 5px 0;
    color: #555;
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;

      strong {
        color: #222;
      }

      em {
        font-size: 14px;
        color: #888;
      }
    }
  }
`;

const NoOrders = styled.p`
  text-align: center;
  color: #888;
`;

const ViewOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<number>(1);
  const [userIds, setUserIds] = useState<number[]>([]); // Lista de IDs de usuarios

  useEffect(() => {
    // Fetch all orders from the API
    axios.get('http://localhost:3000/order/orders')
      .then(response => {
        if (response.data.success === 'success') {
          const allOrders: Order[] = response.data.data;

          // Obtener lista de IDs únicos de usuarios
          const ids = Array.from(new Set(allOrders.map(order => order.user_id)));
          setUserIds(ids);

          // Filtrar órdenes por user_id
          const filteredOrders = allOrders.filter(order => order.user_id === userId);
          setOrders(filteredOrders);
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (
    <Container>
      <Header>Detalle de Órdenes</Header>

      <SelectContainer>
        <label htmlFor="userId">Filtrar por ID de Usuario:&nbsp;</label>
        <select
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {userIds.map(id => (
            <option key={id} value={id}>
              Usuario #{id}
            </option>
          ))}
        </select>
      </SelectContainer>

      {orders.length === 0 ? (
        <NoOrders>No se encontraron órdenes para este usuario.</NoOrders>
      ) : (
        orders.map((order) => (
          <OrderCard key={order.id}>
            <h3>Orden #{order.id}</h3>
            <p><strong>Fecha:</strong> {new Date(order.order_date).toLocaleString()}</p>
            <p><strong>Estado:</strong> {order.estado}</p>
            <p><strong>Total:</strong> ${order.total_amount}</p>
            <p><strong>Mesa:</strong> {order.table_number}</p>

            <h4>Productos:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <strong>{item.product.name}</strong> - {item.quantity} x ${item.product.price} = ${item.total_price}
                  <br />
                  <em>{item.product.description}</em>
                </li>
              ))}
            </ul>
          </OrderCard>
        ))
      )}
    </Container>
  );
};

export default ViewOrders;
