import React from 'react'
import Sidebar from '../components/Sidebar'
import ChatScreen from '../components/chatScreen'

const Chat = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <ChatScreen/>
    </div>
  )
}

export default Chat
