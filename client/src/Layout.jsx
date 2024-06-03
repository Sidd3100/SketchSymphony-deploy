import React, {useState, useEffect} from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

import { Outlet } from 'react-router-dom'

function Layout() {
    const [theme, setTheme] = useState(null);

    useEffect(()=>{
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        setTheme('dark')
      }
      else{
        setTheme('light')
      }
    },[])

    useEffect(()=>{
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
    },[theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

    return (
        <>
           <Navbar toggleTheme={toggleTheme}/>
           <Outlet/>
           <Footer/> 
        </>
    )
}

export default Layout;