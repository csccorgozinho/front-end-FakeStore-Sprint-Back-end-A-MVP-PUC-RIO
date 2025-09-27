// src/pages/Checkout/Checkout.jsx
import { useContext, useState, useEffect } from 'react';
import './Checkout.css';
import { HeartedContext } from '../../contexts/HeartedContext';
import CartCheckout from '../../components/CartCheckout/CartCheckout';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/DarkModeContext';
import axios from 'axios'; // Importar axios

function Checkout() {
  const { darkMode } = useContext(ThemeContext);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { hearted, setHearted } = useContext(HeartedContext);
  const [total, setTotal] = useState(0);
  const BACKEND_URL = "http://localhost:8000"; // URL do seu back-end FastAPI

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '692px',
      maxHeight: '90vh',
      overflow: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0, .5)',
    },
  };

  Modal.setAppElement(document.getElementById('root'));

  useEffect(() => {
    let updatedTotal = 0;
    hearted.forEach((element) => {
      updatedTotal += element.price;
    });
    setTotal(updatedTotal.toFixed(2));
  }, [hearted]);

  const handleCheckout = async () => {
    if (hearted.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    try {
      const purchaseItems = hearted.map(item => ({
        product_id: item.id,
        product_name: item.title,
        product_price: item.price,
        quantity: 1, // Assumindo quantidade 1 por item no carrinho
      }));

      const response = await axios.post(`${BACKEND_URL}/purchases/`, {
        items: purchaseItems,
      });

      console.log("Compra realizada com sucesso:", response.data);
      setIsCheckedOut(true); // Abre o modal de sucesso
      setHearted([]); // Limpa o carrinho no front-end após o sucesso
      localStorage.removeItem("Carted"); // Limpa o LocalStorage
    } catch (error) {
      console.error("Erro ao finalizar a compra:", error.response ? error.response.data : error.message);
      alert("Erro ao finalizar a compra. Tente novamente.");
    }
  };

  return (
    <div
      className={
        darkMode ? 'checkout-container' : 'checkout-container dark-checkout-container'
      }
    >
      <div
        className={
          darkMode ? 'checkout-items' : 'checkout-items dark-checkout-items'
        }
      >
        <div
          className={
            darkMode ? 'item-details' : 'item-details dark-item-details'
          }
        >
          <p>Item</p>
          <div className='item-sub-details'>
            <p>Preço</p>
            <p>Quantidade</p>
            <p>Remover</p>
          </div>
        </div>
        {hearted.length === 0 ? (
          <h1 className='error-message'>Nenhum Produto no Carrinho</h1>
        ) : (
          hearted.map((item) => <CartCheckout productsAdded={item} key={item.id} />)
        )}
        {hearted.length === 0 ? (
          ''
        ) : (
          <div className='total-container'>
            <p>Total: ${total}</p>
            {!isCheckedOut ? (
              <button className='checkout-button' onClick={handleCheckout}>
                Finalizar Compra
              </button>
            ) : (
              <button className='checkout-button checked' disabled>
                Compra Finalizada
              </button>
            )}
            <Modal
              isOpen={isCheckedOut}
              style={customStyles}
              contentLabel='Checkout Modal'
            >
              <div className='modal-container'>
                <h1>Sua Compra foi realizada com sucesso!</h1>
                <h2>Verifique seu e-mail para a confirmação do pedido. Obrigado por comprar na Fake Store!</h2>
                <Link to='/'>
                  <button className='modal-button' onClick={() => setIsCheckedOut(false)}>
                    Voltar para a Página Principal
                  </button>
                </Link>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}
export default Checkout;