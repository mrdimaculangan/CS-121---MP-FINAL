import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import styles from './shop.module.css';
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || ''; // if empty shows all products

  {/* FILTERR PRODUCTS THRU SEARCHBAR */}
  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className={styles.shopContainer}>
      <Navbar />
      <div className={styles.shopSection}>
        <h1>SHOP SECTION</h1>
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/itemdescription/${product.id}`}
              className={styles.productCard}
            >
              <img src={product.image} alt={product.name} />
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>₱{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
