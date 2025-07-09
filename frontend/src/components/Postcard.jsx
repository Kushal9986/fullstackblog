import React from 'react'
import { Link } from 'react-router-dom'


function Postcard({id,image,title}) {
    
    return (
      <Link to={`/post/${id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center flex mb-4'>
                <img src={image} alt={title} className='rounded-xl'/>
            </div>
            <h2
                className='text-xl font-bold flex justify-center w-80%'
            >{title}</h2>
        </div>
      </Link>  
    )
}

export default Postcard
