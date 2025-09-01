
import React, {useEffect, useState} from "react";
import {auth} from '../config/fireBase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import currentUser from "../App"

export const Register = ({ onQuizStart }) => {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if(currentUser === null){
      onQuizStart(name)
    }
  })

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  
  
  const validatePassword = () => {
    let isValid = true
    if (password === '') {
      isValid = false
      console.log('Passwords does not match')
    }
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res.user)
            onQuizStart(name)
          })
        .catch(err => console.log(err.message))
        console.log(email)
        console.log(password)
    }
  }
  


  return (
    <div>
      <div className="card"></div>
      <div className='content'>
      <h1 className='test'>Регистрация</h1><br/><br/>
      <form onSubmit={handleSubmit}>
        <label for="name">Имя   </label>
        <input className="input" type="name" name="Имя" placeholder="Имя" value = {name} onChange={onChangeName} /><br/><br/>
        <label for="email">Почта   </label>
        <input className="input" type="email" name="Почта" placeholder="Почта" value = {email} onChange={onChangeEmail} /><br/><br/>
        <label for="password">Пароль   </label>
        <input className="input" type="password" name="Пароль" placeholder="Пароль" value = {password} onChange={onChangePassword}/>
        <button className="button" type="submit">Submit</button>
      </form>
      </div>
    </div>
  );
};

export default Register;
