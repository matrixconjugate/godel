import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import axios from 'axios'; // Add axios for API requests

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/signup', { name, email, password });
      console.log(response.data.message);
      window.alert("Sign up successfully");
    } catch (error) {
      setError(error.response.data.message);
      console.error('Error signing up:', error.response.data.message);
    }
  };
  

  return (
    <div className={styles.containerfluid}>
      <div className={styles.bgimage}></div>
      <div className={styles.cardcontainer}>
        <div className={styles.cardbody}>
          <h2>Signup now</h2>
          <div className={styles.inputs}>
            <input
              className={styles.forminput}
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={styles.forminput}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.submitbtn} onClick={handleSignUp}>
              SIGN UP
            </button>
            </div>
            <Link href='/login' style={{ color: '#1266f1'}}>
                    Already have an account?Login
                  </Link>
          </div>
        </div>
      </div>
      )
    }
    