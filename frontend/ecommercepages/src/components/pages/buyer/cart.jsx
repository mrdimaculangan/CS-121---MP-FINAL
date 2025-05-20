import React from 'react';
import styles from './cart.module.css';
import Navbar from './navbar';
import { useCart } from 'react-use-cart'; 
import { useState } from 'react';


const Cart = () => {
  const { items,removeItem,cartTotal, updateItemQuantity, emptyCart} = useCart();
  const [successCheckout, setSuccessCheckout] = useState(false);
  const [emptyCartMessage, setEmptyCartMessage] = useState(false);

    const handleCheckout = () => {
      if (items.length === 0) {
        setEmptyCartMessage(true);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please log in to checkout.");
        return;
      }

      const cartSummary = items.map(item => `${item.name} x${item.quantity}`).join(', ');
      
      console.log("TOKEN:", token);
      console.log("Sending:", {
        items: cartSummary,
        total_price: (cartTotal * 1.12).toFixed(2)
      });
      
      fetch('http://localhost:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          items: cartSummary,
          total_price: (cartTotal * 1.12).toFixed(2),
        }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save order");
          return res.json();
        })
        .then((data) => {
          console.log("Order saved:", data);
          setSuccessCheckout(true);
          emptyCart();
        })
        .catch((err) => {
          console.error("Failed to save order:", err);
          alert("There was a problem saving your order.");
        });
    };

  return (
    <div className={styles.cartContainer}>
      <Navbar />

      <div className={styles.cartWrapper}>
        {/* Cart Section */}
        <div className={styles.cartBox}>
          <h2>your cart 🛒 </h2>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>₱{item.price}</p>
                  <div className={styles.quantityControls}>
                  <button 
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}>-</button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                  <button 
                    className={styles.removeItem}
                    onClick={() => removeItem(item.id)}>remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Receipt Section */}
        <div className={styles.receiptBox}>
          <h2>receipt</h2>
          <div className={styles.receiptHeader}>
            <p>Francesca’s Flowers</p>
            <p>5th Avenue, New York City</p>
            <p>🧾 Receipt No: #FF-{Math.floor(Math.random() * 10000)}</p>
            <p>Cashier: Song Kang</p>
          <hr />
          </div>

          {items.map((item) => (
            <div className={styles.receiptRow} key={item.id}>
              <span>{item.name} x {item.quantity}</span>
              <span>₱{item.quantity * item.price}</span>{/* itemTotal = price * quantity */}
            </div>
          ))}

          <hr />

          <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>₱{cartTotal}</span>
          </div>
          <div className={styles.totalRow}>
            <span>VAT (12%)</span>
            <span>₱{(cartTotal * 0.12).toFixed(2)}</span>
          </div>
          <div className={styles.totalRow}>
            <strong>Total</strong>
            <strong>₱{(cartTotal * 1.12).toFixed(2)}</strong>
          </div>
          <hr />

          <div className={styles.receiptFooter}>
            <p>🌷 Thank you for blooming with us!</p>
            <p>Come back soon, babygirl 💌</p>
          </div>

          <button
          className={styles.checkoutBtn}
          onClick=
          {handleCheckout}
          >checkout</button>    
      </div>
          

      {/* handle checkout */}
       {successCheckout && (
        <div className={styles.messageOverlay}>
        <div className={styles.confirmContent}>
        <h3 className={styles.checkoutconfirm}>Your order has been successfully placed! Thank you for ordering!</h3>
        <button 
          className={styles.closeMessage} 
          onClick={() => {
            emptyCart(); 
            setSuccessCheckout(false);
          }}
        >
          Return to page
        </button>
    </div>
  </div>
    )}
      {emptyCartMessage && (
        <div className={styles.messageOverlay}>
          <div className={styles.confirmContent}>
            <h3 className={styles.checkoutconfirm}>Your cart is empty. Please add items before checking out.</h3>
            <button 
            className={styles.closeMessage} 
            onClick={() => 
            setEmptyCartMessage(false)
            }>
              Return to page
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Cart;