import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './styles.css'
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api'

 function AddModal({
  openModal,
  closeModal
 })
 {

  const {token} = useGlobalContext('')
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [email, setEmail] = React.useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await api.post('/contatos',
      {
        nome: name,
        telefone: phone,
        email: email
      },
      {
        headers: {
        Authorization : `Bearer ${token}`
        }
      }
      )
      
      if( response.status > 204){
        return
      }
      closeModal()
      console.log(response)
    } catch (error) {
      
    }
  }
  return (
    <>
   {openModal &&
    
<div className='backdrop'>
   <div className='container-modal-add'>
    <Box className='box'
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1 className='titulo-modal-add'><nobr>Adicionar Contato</nobr></h1>
      <TextField id="filled-basic"
       label="Nome"
        variant="filled"
        onChange={(e) => setName(e.target.value)}
         /><br/>

      <TextField id="filled-basic"
       label="Email"
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
         /><br/>
         <TextField id="filled-basic"
       label="Telefone"
        variant="filled"
        onChange={(e) => setPhone(e.target.value)}
         />
         <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={handleSubmit} >
        Adicionar
      </Button>
      <Button variant="contained" color="error" onClick={closeModal}>
        Cancelar
      </Button>
    </Stack>
     
    </Box>
    </div>
</div>
 }
    </>
   
  );
}

export default AddModal