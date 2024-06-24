import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';


function Layout({ userData, setuserData, mode , setMode  }) {
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem("userToken")
    setuserData(null)
    navigate("/Login")
  }
  return <>

    <Navbar userData={userData} logOut={logOut} mode={mode} setMode={setMode} />
    <div className="container  ">
      <Outlet />
    </div>


    <Footer />

    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam porro natus voluptatibus. Repudiandae aliquam quia rem voluptatem doloribus? Enim, quaerat accusantium! Id illo nostrum quidem molestiae nesciunt inventore nihil aspernatur.</p> */}

  </>
}

export default Layout