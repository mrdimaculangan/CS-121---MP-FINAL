import React, { useState } from 'react';
import styles from './login.module.css'; 
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  {/* REGISTER to django */}
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');


  {/* ------- HANDLING LOG-IN TO DJANGO --------- */}
  const handleLogin = async (e) => {
  e.preventDefault();

  const accload = {
    username: email,
    password: password,
  }

  try {
    const res = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accload),
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (res.status === 200 && data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username); // PARA SA "Your Account" PART 
      
      // automatic to homepage after login
      navigate('/home');
    } else {
      alert("Login failed: " + JSON.stringify(data));
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error logging in.");
  }
};

  {/* ------- HANDLING REGISTER TO DJANGO ------- */}
  const handleRegister = async (e) => {
  e.preventDefault();

    try {
      const res = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerEmail,
          email: registerEmail,
          password: registerPassword,
          first_name: firstName,
          last_name: lastName,
          is_seller: false,
        }),
      });

      const text = await res.text(); 

      console.log("Server response:", text);

      if (res.status === 201) {
        alert('Registered successfully!');
        setShowRegister(false);
      } else {
        alert('Registration failed: ' + text); 
      }
    } catch (err) {
      console.error('Catch block error:', err);
      alert('An error occurred during registration.');
    }
  };


  return (
    <div className={styles.loginContainer}>
      <Navbar />
      <div className={styles.loginregisterBody}>
        <div className={`${styles.loginregisterMain} ${showRegister ? styles.active : ''}`}>
          
          {/* Login Form */}
          <div className={styles.formPage}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
              <label
                className={styles.loginLabel}
                onClick={() => setShowRegister(false)}
              >
                log-in
              </label>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={styles.logInButton}>LOG IN</button>
            </form>
          </div>

          {/* Register Form */}
          <div className={`${styles.formPage} ${styles.registerForm}`}>
            <form onSubmit={handleRegister}>
              <label
                className={styles.registerLabel}
                onClick={() => setShowRegister(true)}
              >
                register
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button type="submit" className={styles.registerButton}>REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
