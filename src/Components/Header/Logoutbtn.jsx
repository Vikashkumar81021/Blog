import React from 'react'
import {useDispatch }from 'react-redux'
import {authService} from '../../AppWrite/Configg'
import  {logout} from '../../store/authSlice'
function Logoutbtn() {
const dispatch=useDispatch()
const handlelogout=()=>{
    authService.logout().then(()=>{
        dispatch(logout())
    })
}

  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue rounded-full'>Logut</button>
  )
}

export default Logoutbtn
