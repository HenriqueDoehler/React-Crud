import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useState } from 'react';
import imgDIr from '../../images/imgDir.svg';
import api from '../../services/api';
import './styles.css';
import {Link, useNavigate } from 'react-router-dom'


 function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword ] = useState('')
  const Navigate = useNavigate()

  function HandleReset(){
    setEmail('')
    setName('')
    setPassword('')
    setConfirmPassword('')
  }
   async function HandleSubmit(e) {
    e.preventDefault()
    try {
      if(!email || !name || !password ) {
        return
      }
      if(password !== ConfirmPassword) {
        return 
      }
      if(password < 6){
        return
      }
        const response = await api.post('/usuarios', {
          nome: name,
          email: email,
          senha : password
        })
        
        HandleReset()
        Navigate('/')

        console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='form-Container'>
        
        <div className='form-inputs'>
           <h1 className='title-form'><nobr> Cadastre-se </nobr> </h1> 
     <Box onSubmit={(e) => HandleSubmit(e)} 
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '500px'},
      }}
      noValidate
      autoComplete="on"
      shrink={false}
    >
      <TextField id="filled-basic"
       label="Nome" 
       type='name'
       variant="filled" 
       value={name}
       onChange={e => {setName(e.target.value)}}
        /> <br />
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
      <TextField id="filled-password-input" 
      label="Confirme sua senha"
       type='password'
        variant="filled"
        value={ConfirmPassword}
       onChange={e => {setConfirmPassword(e.target.value)}}
         /> <br />
      <Button className='btn-cadastrar' variant="contained" color='success' type='submit' >Cadastrar</Button>
      <Button className='btn-cancelar' variant="contained"  color='error' type='reset' onClick={()=> HandleReset()}>Cancelar</Button>
              </Box>
              <span><nobr>Ja tem cadastro? <Link to="/">Clique Aqui</Link></nobr></span>
        </div>
        <div className='-register'>
          <img  src={imgDIr} alt='pic' /> 
    </div>
        </div>
            
   
  );
}


export default Register