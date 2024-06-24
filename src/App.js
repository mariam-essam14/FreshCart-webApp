import logo from './logo.svg';
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Offline, Online } from "react-detect-offline";
import Layout from './Pages/Layout/Layout';
import Home from './Pages/Home/Home';
import Login from './Auth/Login/Login';
import toast, { Toaster } from 'react-hot-toast';
import Reg from './Auth/Reg/Reg';
import AllProducts from './Pages/AllProducts/AllProducts';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Brands from './Pages/Brands/Brands';
import ForgetPass from './Auth/ForgetPass/ForgetPass';
import Profile from './Pages/Profile/Profile';
import Cart from './Pages/Cart/Cart';
import WishList from './Pages/WishList/WishList';
import NotFound from './Pages/NotFoundPage/NotFoundPage';
import PayMent from './Pages/PayMent/PayMent'
import { getDesignTokens } from './theme';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
function App() {
  // dark mode
  const [mode, setMode] = React.useState(Boolean(localStorage.getItem("currentMode")) ? localStorage.getItem("currentMode") : "light");


  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  useEffect(() => {
    document.body.className = mode; // Update the body class based on the theme
    localStorage.setItem('currentMode', mode); // Save theme mode to local storage
  }, [mode]);
  
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      saveUserData()
    }
  }, [])
  const [userData, setuserData] = useState(null)
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      let data = jwtDecode(localStorage.getItem("userToken"))
      setuserData(data)
    }
  }, [])
  function saveUserData(data) {
    setuserData(data)
  }
  function logOut() {
    localStorage.removeItem("userToken")
    setuserData(null)
    return <Navigate to='/Login' />
  }
  function ProtectedRoute(props) {
    if (localStorage.getItem('userToken')) {
      return props.children
    }
    else {
      return <Navigate to='/Login' />
    }
  }

 
  let routers = createHashRouter([
    {
      path: '', element: <Layout setuserData={setuserData} userData={userData} logOut={logOut} mode={mode} setMode={setMode}/>, children: [
        { index: true, element: <ProtectedRoute><Home saveUserData={saveUserData} /></ProtectedRoute> },
        { path: 'Products', element: <ProtectedRoute><AllProducts /></ProtectedRoute> },
        { path: 'brand', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'ProductDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        // { path: 'About', element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: 'Cart', element: <ProtectedRoute> <Cart /></ProtectedRoute> },
        { path: 'wishList', element: <ProtectedRoute> <WishList   /></ProtectedRoute> },
        { path: 'Checkout', element: <ProtectedRoute><PayMent/></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile userData={userData}/></ProtectedRoute> },
        { path: 'Login', element: <Login saveUserData={saveUserData} /> },
        { path: 'Register', element: <Reg saveUserData={saveUserData} /> },
        // { path: 'RestPass', element: <ResetPass/> },
        { path: 'ForgetPass', element: <ForgetPass/> },
        { path: '*', element: <NotFound /> },


      ]
    }
  ])

  return <>
    <ThemeProvider theme={theme}>
      <Toaster />
      <Offline>
        <div className='network fw-bold  text-center'><i className="fa-solid fa-wifi fa-sm text-white mx-2"> !</i> Your're offline </div>
      </Offline>
      <RouterProvider router={routers}></RouterProvider>
    </ThemeProvider>

  </>


}

export default App;
