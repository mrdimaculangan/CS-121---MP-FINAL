import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import Navbar from './navbar';
import styles from './itemdescription.module.css';

const ItemDescription = () => {
  const { id } = useParams(); // Get product ID from URL
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);

  const token = localStorage.getItem('token');
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showAddToCartMessage, setShowAddToCartMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Failed to fetch product:", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginMessage(true);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    setShowAddToCartMessage(true);
    setTimeout(() => setShowAddToCartMessage(false), 1500); // auto-hide
  };

  if (!product) {
    return <div className={styles.itemContainer}>Loading...</div>;
  }

  return (
    <div className={styles.itemContainer}>
      <Navbar />

      <div className={styles.content}>
        {/* PRODUCT IMAGE */}
        <div className={styles.productimage}>
          <img src={product.image} alt={product.name} />
        </div>

        {/* PRODUCT DETAILS */}
        <div className={styles.productdescription}>
          <h1 className={styles.productname}>{product.name}</h1>
          <h3 className={styles.price}>₱{product.price}</h3>
          <h2 className={styles.description}>{product.description}</h2>

          <div className={styles.buttongroup}>
            <button 
              type="button" 
              className={styles.add}
              onClick={handleAddToCart}
            >
              add to cart
            </button>
          </div>
        </div>
      </div>

      {showLoginMessage && (
        <div className={styles.failedOverlay}>
          <div className={styles.failedmessageBox}>
            <h3 className={styles.failedMessage}>
              Please log in before adding to cart.
            </h3>
            <button 
              className={styles.closefailedMessage} 
              onClick={() => setShowLoginMessage(false)}>
              Return to page
            </button>
          </div>
        </div>
      )}

      {showAddToCartMessage && (
        <div className={styles.addtocartOverlay}>
          <div className={styles.addtocartMessageBox}>
            <h3 className={styles.addtocartMessage}>
              Item added to cart! ✿
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDescription;