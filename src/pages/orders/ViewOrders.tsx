// src/pages/Tables/ViewOrders.tsx
import React, { useContext, useState, useEffect } from 'react';
import { GetOrderIdContext } from '../Tables/GetOrderIdContext';
import { PostCompleteOrderContext } from '../Tables/PostCompleteOrder';


export const ViewOrders = () => {
    const getOrderIdContext = useContext(GetOrderIdContext); // Contexto para obtener el `lastOrderId`
    const postCompleteOrderContext = useContext(PostCompleteOrderContext); // Contexto para actualizar el estado de la orden
  
    if (!getOrderIdContext || !postCompleteOrderContext) {
      throw new Error('Los contextos no están disponibles');
    }
  
    const { fetchLastOrderId, lastOrderId } = getOrderIdContext;
    const { updateOrderStatus } = postCompleteOrderContext;
  
    const [message, setMessage] = useState<string>(''); // Estado para mostrar el mensaje
    const [orderId, setOrderId] = useState<number | null>(null); // Variable local para guardar el `order_id`
  
    useEffect(() => {
      if (lastOrderId !== null) {
        setOrderId(lastOrderId); // Guardamos el order_id en el estado local
      }
    }, [lastOrderId]);
  
    const handleFetchOrderId = () => {
      fetchLastOrderId(); // Llama a la función para obtener el último `order_id`
    };
  
    const handleCompleteOrder = async () => {
      if (orderId !== null) {
        const result = await updateOrderStatus(orderId); // Llama a la función para completar la orden
        setMessage(`Order ID: ${orderId}, Actualización: ${result}`); // Muestra el mensaje con el resultado
      } else {
        setMessage('No se ha obtenido un Order ID aún.');
      }
    };
  
    return (
      <div>
        <h1>Detalles de la Tabla</h1>
        <button onClick={handleFetchOrderId}>Obtener Order ID</button>
        <button onClick={handleCompleteOrder}>Completar Orden</button>
        
        {lastOrderId !== null && !orderId ? (
          <p>El último Order ID es: {lastOrderId}</p>
        ) : (
          <p>No se pudo obtener el Order ID.</p>
        )}
        
        {orderId && <p>Order ID guardado: {orderId}</p>} {/* Muestra el Order ID guardado */}
        
        {message && <p>{message}</p>} {/* Muestra el mensaje de estado */}
      </div>
    );
  };