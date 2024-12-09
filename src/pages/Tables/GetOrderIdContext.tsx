import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Product } from '../products/ProductList';

interface Order {
  id: number;
  user_id: number;
  order_id: number;
  product_id: number;
  product: Product;
  quantity: number;
  total_price: number;
  table_number: number;
}

// Define el tipo para el contexto de obtener el último `order_id`
interface GetOrderIdContextType {
  lastOrderId: number | null;
  fetchLastOrderId: () => void; // Solo obtiene el último order_id
  refreshOrderId: () => Promise<number | null>; // Refresca el `order_id` y devuelve el número actualizado
}

// Crea el contexto para obtener el último `order_id`
export const GetOrderIdContext = createContext<GetOrderIdContextType | undefined>(undefined);

interface GetOrderIdProviderProps {
  children: ReactNode;
}

export const GetOrderIdProvider: React.FC<GetOrderIdProviderProps> = ({ children }) => {
  const [lastOrderId, setLastOrderId] = useState<number | null>(null);

  // Función para obtener el último `order_id` basándonos en el `id` más grande
  const fetchLastOrderId = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/order');
      if (response.data && response.data.data) {
        const allOrders = response.data.data as Order[];
        // Ordenar las órdenes por `id` en orden descendente
        const latestOrder = allOrders.sort((a, b) => b.id - a.id)[0];
        setLastOrderId(latestOrder.order_id); // Tomamos el `order_id` de la orden más reciente
      }
    } catch (error) {
      console.error('Error al obtener las órdenes', error);
    }
  }, []); // useCallback evita que se vuelva a crear la función cada render

  // Función para refrescar el `order_id` y devolver el último
  const refreshOrderId = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/order');
      if (response.data && response.data.data) {
        const allOrders = response.data.data as Order[];
        // Ordenar las órdenes por `id` en orden descendente
        const latestOrder = allOrders.sort((a, b) => b.id - a.id)[0];
        setLastOrderId(latestOrder.order_id); // Actualiza el estado con el último order_id
        return latestOrder.order_id; // Devuelve el `order_id` actualizado
      }
      return null;
    } catch (error) {
      console.error('Error al refrescar el order_id', error);
      return null;
    }
  }, []); // useCallback evita que se vuelva a crear la función

  useEffect(() => {
    fetchLastOrderId(); // Cargar el último `order_id` al iniciar
  }, [fetchLastOrderId]);

  return (
    <GetOrderIdContext.Provider value={{ lastOrderId, fetchLastOrderId, refreshOrderId }}>
      {children}
    </GetOrderIdContext.Provider>
  );
};
