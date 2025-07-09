import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Editpost from './pages/Editpost.jsx'
import { RouterProvider } from 'react-router-dom'
import Post from './pages/Post.jsx'
import Addpost from './pages/Addpost.jsx'
import Mypost from './pages/Mypost.jsx'
import AuthLayout from "./components/Authlayout.jsx"

const router = createBrowserRouter([{
    path: "/",
    element: <App />,
    children: [
        {
            path: "",
            element: <Home />,
        },
         {
            path: "/signup",
            element: (<AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/login",
            element: (<AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },

        {
            path: "/post/:id",
            element:(<AuthLayout authentication={true}>
                    <Post />
                </AuthLayout>
            ),
        },  
        {
            path: "/edit-post/:id",
            element: (<AuthLayout authentication={true}>
                    <Editpost />
                </AuthLayout>
            ),
        },  
        {
            path: "/add-post",
            element: (<AuthLayout authentication={true}>
                    <Addpost />
                </AuthLayout>
            ),
        },  

        {
            path: "/my-posts",
            element: (<AuthLayout authentication={true}>
                    <Mypost/> 
                </AuthLayout>
            ),
        },  
        
        
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
   
  </StrictMode>,
)
