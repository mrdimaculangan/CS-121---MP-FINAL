import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  {/* ABOUT US IS NOT PAGE  */}
  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?section=about");
    } else {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  {/* FETCH FROM DJANGO */}
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);


  {/* SEARCH BAR FUNCTION */}
  const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (searchTerm.trim() !== '') {
    {/* ANYWHERE U ARE U WILL GO TO SHOP */}
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
    setSearchTerm('');
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
      </div>

      <div className={styles.navRow}>
        <ul className={styles.navLinks}>
          <li><Link to="/">home</Link></li>
          <li><Link to="/shop">shop</Link></li>
          <li><a href="#about" onClick={handleAboutClick}>about us</a></li>
          <li><Link to="/login">log-in</Link></li>
          <li><Link to="/cart">cart</Link></li>
          <li><Link to="/profileinformation">your account</Link></li>
        </ul>

        <form className={styles.search} onSubmit={handleSearchSubmit}>
          <input className={styles.searchBar}
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
           />
          <button type="submit" className={styles.searchSubmit}>
           <img src={search} alt="Search" width="20" />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
