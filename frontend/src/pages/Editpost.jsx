import React from 'react'
import { useEffect,useState } from 'react'
import { Container,PostForm } from '../components/index.js'

import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Editpost() {
    const [post, setPosts] = useState(null)
    const{id } = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if (id) {
            fetch(`http://fullstackblog-ff5v.onrender.com/api/getarticlebyid/${id}`)
            .then((response)=>{
                if(response.ok){
                    console.log("response::getbyid editpost:",response)
                    return response.json()
                }
            })
            .then((post)=>{
                console.log("post: ",post)
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    },[id,navigate])
    return post? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}

export default Editpost
