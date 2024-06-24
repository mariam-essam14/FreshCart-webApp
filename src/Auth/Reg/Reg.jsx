import React , { useState }from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material'
function Reg({saveUserData}) {

    let navigate = useNavigate();
    const [isLoading , setisLoading]=useState(false)
    const [msgError , setmsgError]=useState('')
    const theme = useTheme()
    async function handleRegister(values){
      setisLoading(true)
     let {data} =await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((errr)=>{
    setisLoading(false)
     setmsgError(`${errr.response.data.message}`)
     })
     if(data.message === 'success'){
      // localStorage.setItem('userToken',data.token)
      // saveUserData();
      saveUserData(data.user)
      localStorage.setItem("userToken",data.token)
      // setisLoading(false)
      navigate("/Login")
     }
     }
  
    let validation = Yup.object({
      name :Yup.string().required("name is required").min(3,"name minlenght is 3").max(10,"name maxlenght is 10"),
      email :Yup.string().required("email is required").email('email is invalid'),
      password :Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with uppercase...'),
      rePassword :Yup.string().required("rePassword is required").oneOf([Yup.ref('password')],'password and repassword doesnt match' ),
      phone :Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, 'phone must be valid number'),
    })
  
    let formik= useFormik({
      initialValues:{
        name: "",
        email:" ",
        password:"",
        rePassword:"",
        phone:""
      },
      validationSchema:validation,
      onSubmit:handleRegister
    })
  return <>
   <div className='w-75 mx-auto  flex  justify-center flex-col mt-24' style={{height:"70vh"}}>
     <h3 className={`font-bold ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}>Register Now :</h3>
     {msgError.length > 0? <div className='alert alert-danger'>{msgError}</div>:null}
     
     <form onSubmit={formik.handleSubmit} className='mt-3'>
       <label htmlFor='name' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Name :</label>
       <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type='text' name='name' id='name'/>
        {formik.errors.name && formik.touched.name ? <p  className='text-Red font-semibold ms-3'>{formik.errors.name}</p> : null}

       <label htmlFor='email' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Email :</label>
       <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email'/>
       {formik.errors.email && formik.touched.email ? <p  className='text-Red font-semibold ms-3'>{formik.errors.email}</p> : null}

       <label htmlFor='password' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Password :</label>
       <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password'/>
       {formik.errors.password && formik.touched.password ? <p  className='text-Red font-semibold ms-3'>{formik.errors.password}</p> : null}

       <label htmlFor='rePassword' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>rePassword :</label>
       <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type='password' name='rePassword' id='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword ? <p  className='text-Red font-semibold ms-3'>{formik.errors.rePassword}</p> : null}

       <label htmlFor='phone'className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Phone :</label>
       <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type='tel' name='phone' id='phone'/>
       {formik.errors.phone && formik.touched.phone ? <p  className='text-Red font-semibold ms-3'>{formik.errors.phone}</p> : null}

        {isLoading?<button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}

       
     </form>
   </div>
  </>
}

export default Reg