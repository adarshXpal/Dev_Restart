import React from 'react'
import UserContextProvider from './context/UserContextProvider'
import Login from './components/Login'

function App() {
  return (
    <UserContextProvider>
      <Login/>
    </UserContextProvider>    
  )
}

export default App
