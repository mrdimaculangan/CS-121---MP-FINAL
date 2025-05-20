import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import home from '../../assets/home.mp4';
import styles from './home.module.css';
import Navbar from './navbar';
import p1 from '../../assets/p1.jpeg'
import p2 from '../../assets/p2.jpeg'
import p3 from '../../assets/p3.jpeg'
import p4 from '../../assets/p4.jpeg'
import hanni from '../../assets/hanni.jpeg'
import jennie from '../../assets/jennie.jpeg'
import wonyoung from '../../assets/wonyoung.jpeg'
import kurt from '../../assets/kurt.jpg'
import ig from '../../assets/ig.png'
import about from '../../assets/about.jpeg'
import maripic from '../../assets/maripic.jpg'
import amorpic from '../../assets/amorpic.jpg'
import yanka from '../../assets/yanka.jpg'


const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section === 'about') {
      const aboutElement = document.getElementById('about');
      if (aboutElement) {
        aboutElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

   useEffect(() => {
      fetch('http://localhost:8000/api/products/')
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to load products:", err));
    }, []);
  
  return (
    <div className={styles.homeContainer}>
      <Navbar />

      <div className={styles.videoSection}>
        <div className={styles.videoGrid}>
            <div className={styles.sideImages}>
            <img src={p1} alt="decor 1" />
            <img src={p2} alt="decor 2" />
            </div>

            <div className={styles.centerVideo}>
            <video src={home} autoPlay loop muted />
            </div>

            <div className={styles.sideImages}>
            <img src={p3} alt="decor 3" />
            <img src={p4} alt="decor 4" />
            </div>
        </div>
        </div>
 

      <div className={styles.shopSection}>
        <h1> Featured 🧸ྀི</h1>
        <div className={styles.productGrid}>
        {products
          .filter((product) => product.id >= 1 && product.id <= 3)
          .map((product) => (
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
        <Link to="/shop">
        <button className={styles.shopButton}>See Full Shop</button>
      </Link>
      </div>

      {/* CELEBRITY FEATURES */}
      <div className={styles.celebsSection}>
      <h1> 𐙚 ‧₊˚ ⋅  FFlowers x Celebrities 𐙚 ‧₊˚ ⋅</h1>
      <h2> 
        <img src ={ig} alt='ig' />
        <span>@fflowers</span>
      </h2>
        <div className={styles.celebGrid}>
            <div className={styles.celebCard}>
            <img src={hanni} alt='hanni' />
            <p className={styles.celebName}>Pham Hanni</p>
        </div>
        <div className={styles.celebCard}>
           <img src={wonyoung} alt='wonyoung' />
            <p className={styles.celebName}>Jang Won-young</p>
        </div>
         <div className={styles.celebCard}>
            <img src={jennie} alt='jennie' />
            <p className={styles.celebName}>Kim Jennie</p>
        </div>
        <div className={styles.celebCard}>
           <img src={kurt} alt='kurt' />
            <p className={styles.celebName}>Pua Kurt</p>
        </div>
      </div>
    </div>

      {/* ABOUT SECTION — scroll target */}
      <div id="about" className={styles.aboutSection}>
      <div className={styles.aboutGrid}>
        {/* LEFT TEXT SIDE */}
        <div className={styles.aboutText}>
          <h1>ABOUT US</h1>
          <p>
            🌺 “We believe every flower tells a story.”🌺 <br />
            Here in <strong>Francesca's Flowers</strong>, we want to be with you on every 
            important occassion of your life. <br />
            Inspired by softness 🌸, curated with love 💌. 
          </p>
          <img src ={about} alt='about'/>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.aboutImages}>
          <div className={styles.topRow}>
            <div className={styles.imageCard}>
              <img src={maripic} alt="Hanni" />
              <p>Mari</p>
            </div>
            <div className={styles.imageCard}>
              <img src={yanka} alt="Bianca" />
              <p>Bianca</p>
            </div>
          </div>
          <div className={styles.bottomRow}>
            <div className={styles.imageCard}>
              <img src={amorpic} alt="Mari" />
              <p>Amor</p>
            </div>
          </div>
        </div>
      </div>
    </div>


      {/* FOOTER SECTION */}
      <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* FFlowers PH */}
        <div className={styles.column}>
          <h3>FFLowers Philippines</h3>
          <ul>
            <li>Who We Are</li>
            <li>Our Story</li>
            <li>100 Years of Service</li>
            <li>Locations</li>
            <li>Events</li>
            <li>Weddings</li>
            <li>Terms of Service</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        {/* Blog */}
        <div className={styles.column}>
          <h3>Blog</h3>
          <ul>
            <li>Styles of Boquets</li>
            <li>Blooms That Make Perfect Gifts</li>
            <li>Beyond Flowers: Francesca's Flowers</li>
            <li>Wedding Set-Ups</li>
            <li>Hotels and More</li>
            <li>How to Choose the Perfect Flowers</li>
            <li>A Guide to Online Flower Delivery</li>
          </ul>
        </div>

        {/* Work With Us */}
        <div className={styles.column}>
          <h3>Work With Us</h3>
          <ul>
            <li>Jobs</li>
            <li>Affiliates</li>
            <li>Press</li>
          </ul>
        </div>

        {/* Help */}
        <div className={styles.column}>
          <h3>Help</h3>
          <ul>
            <li>Flower Care</li>
            <li>Delivery</li>
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Substitution Policy</li>
          </ul>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Home;
