import { useState,useEffect } from 'react'
import { ThemeProvider } from './contexts/theme'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './Apg.css'

function App() {
  const [themeMode,setThemeMode]=useState("light")
  const lightTheme=()=>{
    console.log('lightTheme function called');
    setThemeMode("light");
  }
  const darkTheme=()=>{
    console.log('darkTheme function called');
    setThemeMode("dark");
  }

  useEffect(()=>{
    console.log('Theme mode changed to:', themeMode);
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.remove("light","dark")
      htmlElement.classList.add(themeMode);
      console.log('HTML classes after change:', htmlElement.className);
    }
  },[themeMode])
  return (
    <>
    <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
      <div className="flex flex-wrap min-h-screen items-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                <ThemeBtn/>
              </div>

              <div className="w-full max-w-sm mx-auto">
                <Card/>
              </div>
          </div>
        </div>
    </ThemeProvider>

    </>
  )
}

export default App
