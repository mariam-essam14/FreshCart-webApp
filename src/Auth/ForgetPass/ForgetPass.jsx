import React , { useState }from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios'
import { useTheme } from '@mui/material'
function ForgetPass() {
  const theme = useTheme()
  let [errorMsg, seterrorMsg]=useState("")
  let [codeVerfiy, setcodeVerfiy]=useState(true)
  let navigate =useNavigate()

  let validationSchema= Yup.object({
    email:Yup.string().required().email('Enter valid Email')
  })
 
  let form1=useFormik({
    initialValues:{
      email:"",
    },
    onSubmit:(val)=>{
      sendEmailMessage(val)
    },
    validationSchema
  })

  let form2=useFormik({
    initialValues:{
      resetCode:"",
    },
    onSubmit:(val)=>{
       verifyResetCode(val)
    },
  })

 async function sendEmailMessage(dataObj){
    let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,dataObj)
    console.log(data);
    if(data.statusMsg==='success'){
      setcodeVerfiy(false)
    }
  }
   async function verifyResetCode(dataObj){
    let {data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,dataObj).catch((error)=>{
      seterrorMsg(error.response.data.message);
    })
    console.log(data);
    if(data.status==="Success"){
        navigate("/RestPass")
    }
   }
  return <>
     <div className='p-4 h-64 mt-28'>
      {codeVerfiy? <form onSubmit={form1.handleSubmit}>
    <div className=''>
       <label htmlFor='Email' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Email</label>
       <input  onChange={form1.handleChange}   type='email' name='email' id='Email' className='form-control'/>
       <button className='btn bg-main mt-3 text-white'>Send Code?</button>
    </div>
  </form> :<form onSubmit={form2.handleSubmit} >
    <div className=''>
       <label htmlFor='resetCode' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Reset Code</label>
       <input onChange={form2.handleChange}  type='text' name='resetCode' id='resetCode' className='form-control'/>
       {errorMsg?<div className='alert alert-danger'>{errorMsg}</div>: ""}
       <button type='submit' className='btn bg-main mt-3 text-white'>verify Code</button>
    </div>
  </form>}
     </div>
  </>
}


export default ForgetPass