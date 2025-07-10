import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '../components/index.js'
import { Postcard } from '../components/index.js'

function Mypost() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState()
    const status = useSelector((state) => state.auth.status)
    // const dispatch = useDispatch()
    // const postslice = useSelector((state)=>{state.post.posts})

    const userdata = useSelector((state) => state.auth.userData)
    console.log("auth status::", status)
    console.log("logged in userdata::", userdata)
    let Mypost = []

    useEffect(() => {
        fetch("https://fullstackblog-ff5v.onrender.com/api/getallarticles/")
            .then((resnponse) => {
                // console.log("Post,response",resnponse)
                return resnponse.json()
            })
            .then((articledata) => {
                console.log("articles:", articledata)
                setPosts(articledata)
                // articledata.map((articledata)=>dispatch(upload(articledata)))
                // console.log("authslice posts::",posts)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [])

    if (!loading) {
        // console.log("loading::",loading)
        if (posts.length == 0 && status) {
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap justify-center">
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
        else if(posts.length > 0) {
           Mypost =  posts.filter((post)=>post.userid == userdata.id)
            if(Mypost.length>0){
                console.log("posts::",Mypost)
            
            return (
                <div className='w-full py-8'>
                    <Container>
                        <div className='flex flex-wrap justify-center'>
                            {posts.map((post) => {
                                console.log("mypost::",Mypost)
                                if (post.userid == userdata.id){
                                    console.log("inside if")
                                    Mypost++
                                        return (<div key={post.$id} className='p-2'>
                                        <Postcard {...post} />
                                    </div>)
                                }
                                console.log('myspost',typeof(Mypost))
                                    
                            }
                            )}
                        </div>
                    </Container>
                </div>
            )}
            else{
                return(
                    <h1 className='text-2xl font-bold'>You don't have any post Yet</h1>
                )
            }
        }
        
    }
    else {
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

export default Mypost
