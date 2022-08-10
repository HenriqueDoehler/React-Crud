import * as React from 'react-use'

function useGlobalContextProvider(){
    const [token, setToken, clearToken] = React.useLocalStorage('token')
    const [user, setUser, clearUser] = React.useLocalStorage('user')
    return {
        token, setToken, clearToken,
        user , setUser , clearUser
    }
}


export default useGlobalContextProvider