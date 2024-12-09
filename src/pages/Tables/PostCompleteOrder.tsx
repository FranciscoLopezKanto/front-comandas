// src/pages/Tables/PostCompleteOrder.tsx
import React, { createContext, useContext } from 'react';
import axios from 'axios';

// Define el tipo para el contexto de actualizar el estado de la orden
interface PostCompleteOrderContextType {
  updateOrderStatus: (orderId: number) => Promise<string>;
}

// Crea el contexto para actualizar el estado de la orden
export const PostCompleteOrderContext = createContext<PostCompleteOrderContextType | undefined>(undefined);

interface PostCompleteOrderProviderProps {
  children: React.ReactNode;
}

export const PostCompleteOrderProvider: React.FC<PostCompleteOrderProviderProps> = ({ children }) => {
  // Función para actualizar el estado de la orden
  const updateOrderStatus = async (orderId: number) => {
    try {
      const response = await axios.post('http://localhost:3000/order/update', {
        order_id: orderId,
        new_status: 'Completado', // Status siempre es "Completado"
      });

      if (response.data && response.data.success === 'success') {
        return 'Actualización exitosa';
      } else {
        return 'Error al actualizar la orden';
      }
    } catch (error) {
      console.error('Error al actualizar el estado de la orden', error);
      return 'Error al hacer la solicitud de actualización';
    }
  };

  return (
    <PostCompleteOrderContext.Provider value={{ updateOrderStatus }}>
      {children}
    </PostCompleteOrderContext.Provider>
  );
};
