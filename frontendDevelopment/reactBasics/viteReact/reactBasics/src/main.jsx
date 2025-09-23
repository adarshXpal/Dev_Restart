import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function MyApp(){
  return(
    <>
    <div>
      <a href="https://google.com" target='_blank'><h1>Hello World !</h1></a>
    </div>
    </>
  )
}

function MyNewApp(){
  return(
    <>
      <div>
        <h1>Ho gaya bhai bus kar !!</h1>
      </div>
    </>
  )
}

const ReactElement=React.createElement('a',{
  href:'https://google.com',target:'_blank'},
  'New Google Button'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
)
