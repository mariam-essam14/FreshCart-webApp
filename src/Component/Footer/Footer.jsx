import React from 'react'
import './Footer.css'
import amazon from '../../image/footer/amazon.png'
import american from '../../image/footer/american-express.png'
import master from '../../image/footer/pngimg.com - mastercard_PNG1.png'
import payPal from '../../image/footer/pngimg.com - paypal_PNG9.png'
import AppStore from '../../image/footer/app-store-apple-google-play-iphone-mid-autumn-lantern-thumbnail.jpg'
import GoogleStore from '../../image/footer/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo-thumbnail.png'
import { useTheme } from '@mui/material'
function Footer() {
    const theme = useTheme()
    return <>

        <footer className={` p-4 mt-3 ${theme.palette.mode==='light'? 'bg-GreayLight':'bg-DarkBlak'}`} >

            <div className='d-flex flex-column  mb-3  p-4'>
                <div className={`p-2 border-bottom borderB ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>
                    <h3 className={`fw-bold text-left   3xl:text-2xl lg:text-2xl md:text-xl sm:text-lg  xs:text-base head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>Get The FreshCart App </h3>
                    <p className={`text-muted text-left  3xl:text-lg lg:text-lg md:text-base sm:text-sm  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>we will send you a link , open it on your phone to download the app.</p>
                    <div className='d-flex   justify-content-between mb-2  footerForm '>
                        <div className='col-xxl-10 col-xl-10  col-lg-10 col-md-12 col-sm-12'><input className='form-control  ' type="email" placeholder='Email...' /></div>
                        <div className='ms-2 col-xxl-2 col-xl-2 col-lg-2 col-md-12 col-sm-12 footerFormBtn  '><button className='btn bg-main text-white  ms-sm-0 mt-lg-0 mt-sm-2 w-lg-75 w-sm-100  '>Share App Link</button></div>
                    </div>
                </div>
                <div className={`p-2 border-bottom borderB ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>
                    <div className='d-flex justify-content-between align-items-center footerPayment'>
                        <div className='d-flex justify-center align-items-center'>
                            <h6 className={`fw-bold 3xl:text-lg lg:text-lg md:text-base sm:text-sm  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`} >Payment Patners  </h6>
                            <div className='d-flex mx-3'>
                                <img src={amazon} className='mx-1 imagPayment' />
                                <img src={american} className='mx-1 imagPayment' />
                                <img src={master} className='mx-1 imagPayment' />
                                <img src={payPal} className='imagPayment' />
                            </div>


                        </div>
                        <div className='d-flex justify-center align-items-center'>
                            <h6 className={`fw-bold 3xl:text-lg lg:text-lg md:text-base sm:text-sm  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>Get deliveries with FreshCart  </h6>
                            <div className='d-flex mx-3'>
                                <img src={AppStore} className='mx-1 imagPlay' />
                                <img src={GoogleStore} className='mx-1 imagPlay' />
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </footer>




    </>
}

export default Footer