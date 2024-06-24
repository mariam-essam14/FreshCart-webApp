import React from 'react'
import logo from '../../image/logo/shopping-cart.png'
import { useDispatch, useSelector } from 'react-redux'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';
function Navbar({ userData, logOut, setMode }) {
    const theme = useTheme()
    const { numOfCartItems } = useSelector((state) => state.cart);
    const { count } = useSelector((state) => state.wishlist)

    return <>
        <nav className={`navbar fixed-top navbar-expand-lg navbar-light ${theme.palette.mode === 'light' ? 'bg-light' : 'bg-Black'}`}>
            <div className="container">
                <Link className={`navbar-brand flex items-center fw-bolder   `} href="#">
                    <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    <span className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>FreshCart</span>

                </Link>
                <button
                    className="navbar-toggler d-lg-none "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" navbar-collapse " id="collapsibleNavId">
                    {userData !== null ? <ul className="navbar-nav me-auto mt-2 mt-lg-0 d-flex justify-center align-items-center">
                        <li className="nav-item">
                            <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="Products">Products</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="brand">Brands</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="profile"><i className='fa-solid fa-user  fa-sm me-1'></i><span className='d-2xl-inline d-xl-inline d-lg-none d-md-inline d-sm-inline '>Your Profile</span></Link>
                        </li>
                        <li>
                            {theme.palette.mode === 'light' ? (
                                <IconButton
                                    onClick={() => {
                                        setMode('dark');
                                    }}
                                    color="inherit"
                                >
                                    <LightModeOutlinedIcon style={{ color: theme.palette.mode === 'light' ? '#4b5563' : '#9ca3af' }} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setMode('light');
                                    }}
                                    color="inherit"
                                >
                                    <DarkModeOutlinedIcon style={{ color: theme.palette.mode === 'light' ? '#4b5563' : '#9ca3af' }} />
                                </IconButton>
                            )}
                        </li>

                    </ul> : null}


                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0 d-flex justify-center align-items-center">

                        {userData == null ? <>

                            <div className='d-flex justify-center items-center md:flex-row sm:flex-col xs:flex-col '>
                                <li className="nav-item">
                                    <Link className={`nav-link me-3 ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="Login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} to="Register">Register</Link>
                                </li>
                            </div>

                        </>
                            : <>
                                <li className="nav-item d-flex align-items-center justify-center">
                                    <i className={`fab mx-2 fa-facebook  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                    <i className={`fab mx-2 fa-twitter  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                    <i className={`fab mx-2 fa-instagram  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                    <i className={`fab mx-2 fa-tiktok  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                    <i className={`fab mx-2 fa-linkedin  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                    <i className={`fab mx-2 fa-youtube  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                </li>
                                <div className='d-flex justify-center items-center ' >
                                    <li className="nav-item position-relative mx-2">
                                        <Link className="nav-link px-2" to="wishList">
                                            <i className='fa-solid fa-heart text-danger fa-lg'></i>
                                            <span className='badge position-absolute top-0 end-0\  bg-main text-white'>{count}</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item position-relative ">
                                        <Link className="nav-link px-2" to="Cart">
                                            <i className={`fas fa-shopping-cart fa-lg  ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}></i>
                                            <span className='badge position-absolute top-0 end-0  bg-main text-white'>{numOfCartItems}</span>
                                        </Link>
                                    </li>
                                </div>

                                <li className="nav-item mx-3">
                                    <Link className={`nav-link ${theme.palette.mode === 'light' ? 'lightMode' : 'darkMode'}`} onClick={logOut} >Logout</Link>
                                </li>
                            </>

                        }









                    </ul>

                </div>
            </div>
        </nav>
    </>
}

export default Navbar