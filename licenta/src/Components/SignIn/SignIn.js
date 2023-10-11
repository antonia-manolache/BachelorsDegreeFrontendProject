import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [emailId, setEmailId] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const login = () => {
    auth
      .signInWithEmailAndPassword(emailId, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        localStorage.setItem('users', JSON.stringify(user));
        navigate('/');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          setErrorMessage('Incorrect password. Please try again.');
        } else if (errorCode === 'auth/user-not-found') {
          setErrorMessage('User not found. Please check your email or sign up.');
        } else {
          setErrorMessage('An error occurred during sign in. Please try again.');
        }
      });
  };

  return (
    <div>
      <input
        className='loginpage_text'
        onChange={(event) => {
          setEmailId(event.currentTarget.value);
        }}
        type='text'
        placeholder='Email'
      />
      <input
        className='loginpage_text'
        onChange={(event) => {
          setPassword(event.currentTarget.value);
        }}
        type='password'
        placeholder='Password'
      />
      {errorMessage && <p>{errorMessage}</p>}
      <button className='login_button' onClick={login}>
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
