import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '../components/index.js'
import { Link } from 'react-router-dom'
import {Button} from '../components/index.js'
import parse from "html-react-parser";
import { getCookie } from '../components/index.js'
function Post() {
    const userData = useSelector((state) => state.auth.userData)
    console.log("userdata::", userData)
    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState()
    const isAuthor = post && userData ? post.userid == userData.id : false;
    console.log("isauthor:::",isAuthor)

     const deletePost = async() => {
        await fetch(`http://localhost:8000/api/deletarticles/${id}`,{
            method:"DELETE",
            headers:{
                "X-CSRFToken": getCookie("csrftoken"),
            }
        })
        .then(async(response)=>{
            if(response.ok){
                // const response2 = await response.json()
                // console.log("response::",response)
                navigate("/")
            }
        })
        
        
    };
    

  useEffect(()=>{
    if (id){
        console.log("id:",id)
        console.log("type of id ::",typeof(id))
        fetch(`http://localhost:8000/api/getarticlebyid/${id}`)
        .then((response)=>{
            console.log("fetcharticlebyid response::",response)
            if(response.ok){
                return response.json()
            }  
            else{return response.json()}    
        }).then((postdata)=>{
            console.log("Postdata::converted to json",postdata)
            if(postdata){
                setPost(postdata)
            }
        })
    }
  },[id,navigate])



return post ? (
        <div className="py-8">
            <Container>
                {isAuthor && (
                        <div className="relative right-13 top- ">
                            <Link to={`/edit-post/${post.id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                <div className="w-full flex justify-center mb-4 mt-4 relative border rounded-xl p-2 flex-wrap align-center">
                    <img
                        src={post.image}
                        
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {/* {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )} */}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                     {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post
