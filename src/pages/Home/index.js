import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import Header from '../../Components/Header/index';
import ModalAdd from '../../Components/modalAdd/index';
import ConfirmModal from '../../Components/modalConfirm/index';
import useGlobalContext from '../../hooks/useGlobalContext';
import api from '../../services/api';

export default function SimpleContainer() {
  const [contacts, setContactss] = React.useState([])
  const {token} = useGlobalContext()
  const [openModal, setOpen] = React.useState(false)
  const [OpenConfirmModal, setConfirmOpen] = React.useState(false)
  const [selectionModel, setSelectionModel] = React.useState([]);

    const columns = [
        {
          field: 'firstName',
          headerName:  'Nome',
          width: 200,
          editable: true,
        },
        {
          field: 'telefone',
          headerName: 'Telefone',
          type: 'number',
          width: 200,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          editable: true,
          width: 200,
          
        },
      ];
    React.useEffect(() =>
{
   async function getContacts(){
        try {
          const response  = await api.get('/contatos',
          {
            headers: {
            Authorization : `Bearer ${token}`
            }
          })
          setContactss(response.data)
          return
        } catch (error) {
          console.log(error)
        }finally{
         return getContacts()
        }
      }
      getContacts()
}, [token])
     const rows = contacts.map((contact) => {
      return {id: contact.id, firstName: contact.nome, telefone: contact.telefone, email: contact.email }  
     })

  return (
    <React.Fragment>
      <Header />
      <CssBaseline />
      <Container className='container-table'  maxWidth="xm">
        <Box m={10} pt={1} sx={{ bgcolor: '#F5F5F5', height: '50vh' }} >
        <Box  sx={{ height: 400, width: '100%' }}>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
        Adicionar
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setConfirmOpen(true)}>
        Deletar
      </Button>
    </Stack>
      <DataGrid className='data-grid'
        rows={rows}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
        disableSelectionOnClick
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </Box>
        </Box>   
            <ModalAdd 
            openModal={openModal}
            closeModal={() => {setOpen(false)}}
            />
            <ConfirmModal
            OpenConfirmModal={OpenConfirmModal}
            closeConfirmModal={() => {setConfirmOpen(false)}}
            userSelected={selectionModel}
            
            />
      </Container>
    </React.Fragment>
    );
  }