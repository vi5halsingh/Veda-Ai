import React, { useState } from 'react'
import {Route , Routes} from 'react-router-dom'
import ChatScreen from '../components/chatScreen.jsx'
import Auth from '../components/Auth.jsx.jsx'
const PageRoutes = () => {
  const [user, setUser] = useState(false)
  async function AuthCheck(){
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      setUser(true)
      return;
    }
  }
  return (
    <div>
      <Routes>
        
      </Routes>
    </div>
  )
}

export default PageRoutes
