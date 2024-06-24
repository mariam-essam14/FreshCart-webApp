import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useTheme } from '@mui/material'
function Login({saveUserData}) {
    let navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false)
    const [msgError, setmsgError] = useState('')
    const theme = useTheme()
    async function handleLogin(values) {
        setisLoading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((errr) => {
            setisLoading(false)
            setmsgError(`${errr.response.data.message}`)
        })
        if (data.message === 'success') {
            saveUserData(data.user);
            localStorage.setItem('userToken', data.token)
            setisLoading(false)
            navigate("/")
        }
    }

    let validation = Yup.object({
        email: Yup.string().required("email is required").email('email is invalid'),
        password: Yup.string().required("password is required").matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with uppercase...'),
    })

    let formik = useFormik({
        initialValues: {
            email: " ",
            password: "",
        },
        validationSchema: validation,
        onSubmit: handleLogin
    })
    return <>
        <div className='w-75 mx-auto flex  justify-center flex-col  ' style={{height:"70vh"}}>
            <h3 className={`font-bold ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`}>Login Now :</h3>
            {msgError.length > 0 ? <div className='alert alert-danger'>{msgError}</div> : null}

            <form onSubmit={formik.handleSubmit} className='mt-3'>

                <label htmlFor='email' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Email :</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type='email' name='email' id='email' />
                {formik.errors.email && formik.touched.email ? <p className='text-Red font-semibold ms-3'>{formik.errors.email}</p> : null}

                <label htmlFor='password' className={theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}>Password :</label>
                <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type='password' name='password' id='password' />
                {formik.errors.password && formik.touched.password ? <p className='text-Red font-semibold ms-3'>{formik.errors.password}</p> : null}
                <div className='text-center text-decoration-underline mx-2 fw-bold'><Link to={"/ForgetPass"} className={` 3xl:text-lg lg:text-lg md:text-base sm:text-sm  xs:text-xxs ${theme.palette.mode === 'light' ? 'text-Black' : 'text-GrayDark'}`} >Forget Password ?</Link></div>

                {isLoading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white '>Login</button>}


            </form>
        </div>
    </>
}

export default Login