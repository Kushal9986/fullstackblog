import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../../store/authslice"
import { useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/csrf'


function LogoutBtn() {
    const dispatch = useDispatch()
    const authstatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate()
    const logoutHandler = async()=>{
        await fetch("https://fullstackblog-ff5v.onrender.com/api/logout/",{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
                
            }
        }).then((response)=>{
            console.log("logout response::",response)
            if(response.ok){
                return response.json()
            }
           
        }).then((logoutinfo)=>{
            console.log("logout INfo::",logoutinfo)
            if(logoutinfo){
                dispatch(logout())
                console.log("status::",authstatus)
                navigate('/')

            }
        })
        
        // fetch()
        //     // setTimeout(() => navigate('/'), 0);    
            
        // }
        // console.log("logout:response",response)
    }
    
    return (
        <button
        onClick={logoutHandler}
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        >Logout</button>
    )
}

export default LogoutBtn
