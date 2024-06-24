import { useTheme } from '@mui/material'
import React from 'react'

function Profile({userData}) {
  const theme = useTheme()
  return <>
   <div className='  flex justify-center items-center h-svh' >
        <div className={`details border border-1 w-100 rounded-2 p-3 ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`} >
          {/* <h2 className='h4 text-main  ms-2'>Your Detalis</h2> */}
          <div className='ms-4 text-center'>
            <p className={`fw-bold mb-0 head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>Hi ,<span className='mx-2 fw-light text-main text-capitalize'>{userData?.name}</span>  </p>
            
          </div>
        </div>
    </div> 
  </>
}

export default Profile