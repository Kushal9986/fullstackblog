

import './App.css'
// import {useSelector} from "react-redux"
import { Header, Footer } from './components/index.js'
import { Outlet } from 'react-router-dom'
import { login,logout } from './store/authslice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch()
useEffect(() => {
    (async function fetch_session() {
      await fetch("https://fullstackblog-ff5v.onrender.com/api/protected-view/", {
        method: "GET",
        credentials: "include"
      })
      .then(res => res.json())
      .then(userData => {
        console.log("userdata::", userData)
        if (userData.error) {
          dispatch(logout())
        } else {
          console.log("insdie else")
            dispatch(login(userData))
          console.log("after ::login")
           // data contains user info from serializer
          }
        })
    })();

  }, []);
 
  //   const authStatus = useSelector((state)=>state.auth.status)
  // console.log(authStatus)
  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
