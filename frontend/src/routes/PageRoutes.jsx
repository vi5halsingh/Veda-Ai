import React, { useState } from 'react'
import {Route , Routes} from 'react-router-dom'
import ChatScreen from '../pages/Chat'
import AuthPage from '../pages/AuthPage'

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
        <Route path='/' element={<ChatScreen/>}/>
        <Route path='/auth-user' element={<AuthPage/>}/>
      </Routes>
    </div>
  )
}

export default PageRoutes
