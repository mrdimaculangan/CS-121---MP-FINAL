import React from 'react';
import Cart from '../../assets/cart.png';
import Heart from '../../assets/heart.png';
import Home from '../../assets/home.png';
import Profile from '../../assets/profile.png';
import Search from '../../assets/search.png';
import design from './navbarseller.module.css';
import { Nav } from 'react-bootstrap';

export const NavbarSeller = () => {
  return (
    <nav className={design.navbar}>
    <div className={design.navbarContainer}>
      <ul className={design.navbarLinksLeft}>
        <li><Nav.Link href="/"><img src={Home} alt="homepage" style={{ width: '40px' }} /></Nav.Link></li>
      </ul>
      <h1 style={{fontFamily: 'Bayer TypeArchiType Regular' }} className={design.storeName}>storename</h1>
      <form className={design.search}>
        <input className={design.searchBar} type='search' placeholder='Search'/>
        <button class="button" type="submit" className={design.searchSubmit}><img src={Search} alt="Description" style={{ width: '25px' }} /></button>
      </form>
      <ul className={design.navbarLinksRight}>
        <li><Nav.Link href="./profileinformation"><img src={Profile} alt="Description" style={{ width: '40px' }} /></Nav.Link></li>
    </ul>
    </div>
  </nav> 
  )
}

export default NavbarSeller;