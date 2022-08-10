import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Home from './pages/Home/index';
import useGlobalContext from './hooks/useGlobalContext';


function ProtectedRoutes({redirectTo}){
  const {token} = useGlobalContext()

  return token ? <Outlet /> : <navigate to={redirectTo} />
}


function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/usuarios' element={<Register />}/>
      <Route element={<ProtectedRoutes redirectTo={'/'}/>} >
         <Route path='/home' element={<Home />}/>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
