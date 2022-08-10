import './styles.css'
import logOut from '../../images/logout.svg'
import logo from '../../images/KONTACTS.svg'
import {useNavigate} from 'react-router-dom'
import useGlobalContext from '../../hooks/useGlobalContext'
function Header(){
    const {clearToken, clearUser} = useGlobalContext()
    const navigate = useNavigate()
    const handleLogout= () => {
    clearToken()
    clearUser()

    navigate('/')
    }
    return(
<header className='container-header'>
    <img className='logo'  src={logo} alt='logo' />
    <img src= {logOut}  alt='log out'
    onClick={handleLogout}/>
</header>
    )
}
export default Header