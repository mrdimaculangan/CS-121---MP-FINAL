import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart'; 
import styles from './profileinformation.module.css';
import Transparent from '../../assets/transparent.png';
import Flower from '../../assets/flower.png';
import Navbar from './navbar';

const ProfileInformation = () => {
  const navigate = useNavigate();
  const { emptyCart } = useCart();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem('token');
  const storedUsername = localStorage.getItem('username');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const users = await res.json();
        const matched = users.find((u) => u.username === storedUsername);

        if (matched) {
          setUser(matched);
        } else {
          alert("User not found. You may need to log in again.");
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        alert("There was a problem loading your profile.");
      }
    };

    fetchUser();
  }, [navigate, token, storedUsername]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    emptyCart(); 
    navigate('/login');
  };

  return (
    <div className={styles.profilepageContainer}>
      <Navbar />

      <div className={styles.profileInfo}>
        <div className={styles.container}>
          <div className={styles.profileMain}>

            <div className={styles.content}>
              <img src={Flower} alt="flower" style={{ width: '90px' }} className={styles.flowerPic} />
              <h1 className={styles.welcomeMessage}>welcome, {user ? user.first_name : '...'}!</h1>
              <h2 className={styles.infoMessage}>here are your information:</h2>
              <h3 className={styles.email}>email: {user ? user.email : '...'} </h3>
              <h3 className={styles.username}>username: {user ? user.username : '...'}</h3>
              <button onClick={handleLogout} className={styles.logout}>log out</button>
            </div>
            <div className={styles.pic}>
              <img id="photo" src={Transparent} alt="nature" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
