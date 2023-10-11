import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [emailId, setEmailId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  };

  const validatePassword = (password) => {
    // Check if password meets your validation criteria
    // For example, at least 6 characters
    setIsPasswordValid(password.length >= 6);
  };

  const newSignUp = () => {
    if (isEmailValid && isPasswordValid) {
      auth
        .createUserWithEmailAndPassword(emailId, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          let payload = {
            userId: user.uid,
            username: username,
            name: name,
            profileImage: '',
          };
  
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          };
  
          fetch('http://localhost:8222/api/users/register', requestOptions)
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem('users', JSON.stringify(user));
              // Upload the image if it exists
              if (image) {
                const formData = new FormData();
                formData.append('file', avatar);
                formData.append('userId', user.uid);
  
                fetch('http://localhost:8222/api/avatars/upload', {
                  method: 'POST',
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    // Handle success response from the server
                    console.log(data);
                    navigate('/');
                  })
                  .catch((error) => {
                    // Handle error
                    console.error('An error occurred during file upload:', error);
                    navigate('/');
                  });
              } else {
                navigate('/');
              }
            })
            .catch((error) => {
              // Handle error
              setErrorMessage('An error occurred during sign up. Please try again.');
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setErrorMessage('Incorrect email or password.');
        });
    }
  };
  

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmailId(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
    setAvatar(selectedImage);
    // Perform any additional image-related operations if needed
  };

  return (
    <div>
      <input
        className='loginpage_text'
        onChange={handleEmailChange}
        type='text'
        placeholder='Email'
      />
      {!isEmailValid && <p>Please enter a valid email</p>}
      <input
        className='loginpage_text'
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
        type='text'
        placeholder='Full name'
      />
      <input
        className='loginpage_text'
        onChange={(event) => {
          setUsername(event.currentTarget.value);
        }}
        type='text'
        placeholder='Username'
      />
      <input
        className='loginpage_text'
        onChange={handlePasswordChange}
        type='password'
        placeholder='Password'
      />

      <div>
        <label htmlFor="image">Image:</label>
        <br />
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "150px" }}
          />
        )}
      </div>
      {!isPasswordValid && <p>Password must be at least 6 characters long</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <button className='login_button' onClick={newSignUp}>
        Sign Up
      </button>
    </div>
  );
}

export default SignUp;
