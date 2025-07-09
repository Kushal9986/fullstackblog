import React from 'react'
import {useSelector} from "react-redux"
import  { useNavigate,Link } from "react-router-dom"
import LogoutBtn from "./LogoutBtn.jsx"
import {Container,Logo} from "../index.js"
function Header() {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
           name:"Home",
           url:"/" ,
           active:true
        },
        {
           name:"Login",
           url:"/login" ,
           active:!authStatus
        },
        {
           name:"Signup",
           url:"/signup" ,
           active:!authStatus
        },
        {
           name:"My Posts",
           url:"/my-posts" ,
           active:authStatus
        },
        {
           name:"Add Post",
           url:"/add-post" ,
           active:authStatus
        },
    ]
    return (
         <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex justify-center align-center'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px'/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto flex-wrap'>
                        {navItems.map((item)=>
                            item.active?(
                                <li key={item.name}>
                                    <button onClick={()=>navigate(item.url)}className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-2xl font-bold'>{item.name}</button>
                                </li>
                            ):null
                        )}
                        {authStatus && (
                            <li className='font-bold text-2xl'>
                                <LogoutBtn />
                            </li>
                        )}

                    </ul>
                </nav>
            </Container>

        </header>
    )
}

export default Header
