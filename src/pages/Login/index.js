import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState, useEffect } from 'react';
import imgLeft from '../../images/imgLeft.svg';
import api from '../../services/api';
import './styles.css';
import {Link, useNavigate } from 'react-router-dom'
import useGlobalContext from '../../hooks/useGlobalContext'

 function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setUser, setToken }  = useGlobalContext()
  const navigate = useNavigate()
  
  
  function HandleReset(){
    setEmail('')
    setPassword('')
  }

   async function HandleSubmit(e) {
    e.preventDefault()
    try {
      if(!email || !password ) {
        return
      }
     
      
        const response = await api.post('/login', {
          email: email,
          senha: password
        })
         if(response.status > 202){
        return 
      }
        HandleReset()

        const { usuario, token } = response.data

        navigate('/Home')
       setToken(token)
       setUser(usuario)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if(token){
      navigate('/home')
    }
},[navigate,token])
  return (
    <div className='form-Container-signIn'>
      
      <img src={imgLeft} alt='pic' /> 
        
        <div className='form-inputs-signIn'>
          <p><nobr>Bem vindo</nobr></p>
           <h1 className='title-form'><nobr>Faça Login com sua conta</nobr> </h1> 
     <Box onSubmit={(e) => HandleSubmit(e)}
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '500px' },
      }}
      noValidate
      autoComplete="on"
    >
      <TextField id="filled-basic" 
      label="Email" 
      variant="filled" 
      value={email}
      onChange={e => {setEmail(e.target.value)}}
      /><br />
      <TextField id="filled-password-input" 
      label="Senha"
       type='password'
       variant="filled" 
       value={password}
       onChange={e => {setPassword(e.target.value)}}
       /><br />
      <Button className='btn-cadastrar' variant="contained" color='success' type='submit' >Entrar</Button>
      <Button className='btn-cancelar' variant="contained"  color='error' type='reset' onClick={()=> HandleReset()} >Cancelar</Button>
              </Box>
              <span><nobr>Não tem cadastro? <Link to="/usuarios">Clique Aqui</Link></nobr></span>
        </div>
    </div>
   
  );
}


export default Login