// src/pages/MyOrders/MyOrders.jsx
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../contexts/DarkModeContext';
import './MyOrders.css'; // Crie este arquivo CSS

const BACKEND_URL = "http://localhost:8000";

function MyOrders() {
  const { darkMode } = useContext(ThemeContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/purchases/`);
      setOrders(response.data);
    } catch (err) {
      setError("Erro ao carregar seus pedidos.");
      console.error("Erro ao buscar pedidos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm("Tem certeza que deseja cancelar este pedido?")) {
      try {
        await axios.delete(`${BACKEND_URL}/purchases/${orderId}`);
        alert("Pedido cancelado com sucesso!");
        fetchOrders(); // Recarrega a lista de pedidos
      } catch (err) {
        alert("Erro ao cancelar o pedido.");
        console.error("Erro ao deletar pedido:", err);
      }
    }
  };

  const handleUpdateItemQuantity = async (purchaseId, itemId, currentQuantity) => {
    const newQuantity = prompt(`Digite a nova quantidade para o item (atual: ${currentQuantity}):`);
    if (newQuantity === null || isNaN(newQuantity) || parseInt(newQuantity) <= 0) {
      alert("Quantidade inválida.");
      return;
    }
    const quantity = parseInt(newQuantity);

    try {
      await axios.put(`${BACKEND_URL}/purchases/${purchaseId}/items/${itemId}?new_quantity=${quantity}`);
      alert("Quantidade do item atualizada com sucesso!");
      fetchOrders(); // Recarrega a lista de pedidos
    } catch (err) {
      alert("Erro ao atualizar a quantidade do item.");
      console.error("Erro ao atualizar item:", err);
    }
  };

  if (loading) return <div className="my-orders-loading">Carregando pedidos...</div>;
  if (error) return <div className="my-orders-error">{error}</div>;

  return (
    <div className={darkMode ? 'my-orders-container' : 'my-orders-container dark-my-orders-container'}>
      <h1>Meus Pedidos</h1>
      {orders.length === 0 ? (
        <p>Você não tem nenhum pedido.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className={darkMode ? 'order-card' : 'order-card dark-order-card'}>
              <h3>Pedido #{order.id}</h3>
              <p>Total: ${order.total_amount.toFixed(2)}</p>
              <h4>Itens:</h4>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.product_name} (x{item.quantity}) - ${item.product_price.toFixed(2)} cada
                    <button onClick={() => handleUpdateItemQuantity(order.id, item.id, item.quantity)}>
                      Atualizar Quantidade
                    </button>
                  </li>
                ))}
              </ul>
              <button className="delete-button" onClick={() => handleDeleteOrder(order.id)}>
                Cancelar Pedido
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;