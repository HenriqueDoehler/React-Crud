import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';

 function ConfirmModal({
  OpenConfirmModal,
  closeConfirmModal,
  userSelected
 })
 {
  const {token} = useGlobalContext('')
  async function HandleDelete() {
    
    try {
      const response  = await api.delete(`/contatos/${userSelected}`,
      {
        headers: {
        Authorization : `Bearer ${token}`
        }
      })
     console.log(response)
     closeConfirmModal()
      return
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
   {OpenConfirmModal &&
    
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
      <h1 className='titulo-modal-confirm'><nobr>Deletar Contato?</nobr></h1>
     
         <Stack direction="row" spacing={2}>
      <Button variant="contained" color="success" onClick={HandleDelete} >
        Confirmar
      </Button>
      <Button variant="contained" color="error" onClick={closeConfirmModal}>
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

export default ConfirmModal