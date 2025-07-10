import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authslice.js'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { getCookie } from './index.js'

function Login() {
    const navigate = useNavigate()
    //for navigating user to home after login
    const dispatch = useDispatch()
    //updating store and status of user
    
    const { register, handleSubmit ,formState:{errors:formerror}} = useForm()
    //handling input , submit , errors

    const [errors, setError] = useState("")
    //const data = useSelector((state)=>state.auth.userData)
    // console.log(data)

    const Login = async (formdata) => {
        setError("")
        try {
            await fetch('http://fullstackblog-ff5v.onrender.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                    "X-CSRFToken": getCookie("csrftoken"),
                },
                credentials: 'include', // ⬅ important: stores Django session
                body: JSON.stringify(formdata)
            })
            .then(async response => {
                if (!response.ok) {
                    // If status is 400 or any error, throw it
                    return response.json().then(errData => {
                        throw new Error(errData.error || 'Login failed');
                    });
                }
                    return response.json(); //  Parse JSON response
            })
            .then(userData => {
                    // console.log("User data after login:", userData);
                    dispatch(login(userData)); // Dispatch to Redux
                    navigate('/');
                })
        }
        catch (error) {
            console.log("error ::",error)
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full mt-10 mb-10'
        >
            <div className={`w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10 m-7`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {errors && <p className="text-red-600 mt-8 text-center">{errors}</p>}
                <form onSubmit={handleSubmit(Login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email:"
                            placeholder="Enter your Email"
                            type="Email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        {formerror.email && <p className="text-red-600 text-sm mt-1">{formerror.email.message}</p>}
                        <Input
                            label="password:"
                            type="password"
                            placeholder="Enter your password"
                            {
                            ...register("password", {
                                required: "Password is required",
                            })
                            }
                        />

                        {formerror.password && <p className="text-red-600 text-sm mt-1">{formerror.password.message}</p>}
                        <Button
                            type="submit"
                            className="w-full"
                        >
                            Sign In
                        </Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login
