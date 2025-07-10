import React, {  useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { Container } from '../components/index.js'
import {Postcard} from '../components/index.js'


function Home() {

const [posts,setPosts] = useState([])
//setPost when components loads and fetch data from api

const [error,setError] = useState("")

const [loading,setLoading] = useState()
//setting loading when calling api

const status = useSelector((state)=>state.auth.status)
// console.log("status:::",status)
//check if user is logged in 


// const userdata = useSelector((state)=>state.auth.userData)
// console.log("auth status::",status)
// console.log("logged in userdata::" ,userdata)
 
    useEffect(()=>{
        fetch("https://fullstackblog-ff5v.onrender.com/api/getallarticles/")
        .then((response)=>{
            // console.log("Post,response",resnponse)
            if (!response.ok) {
                return response.json()
                .then(err => {
                    throw new Error(err.message || 'Server error');
                 });
            }
            return response.json();
        })
        .then((articledata)=>{
            console.log("articles:",articledata)
            setPosts(articledata)
                // articledata.map((articledata)=>dispatch(upload(articledata)))
                // console.log("authslice posts::",posts)
            })
        .catch((error)=>{
            console.log("error:",error.message)
            setError(error.message)
        })

        .finally(()=>{
            setLoading(false)
        })
            
    },[])

    if (!loading) {
    // console.log("loading::",loading)
        if (posts.length == 0 && status) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No post Yet 
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
        else if (!status) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                       <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Login to Read Post
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
        else {
            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap justify-center'>
                            {posts.map((post) => (
                                <div key={post.$id} className='p-2 '>
                                    <Postcard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            )
        }
    }
    else{
        return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    Loading
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
    }
    
}

export default Home
