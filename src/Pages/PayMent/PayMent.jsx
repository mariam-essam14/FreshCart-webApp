import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import {
    onlinePayment
} from '../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export default function Checkout() {


    const { cartId} = useSelector((state) => state.cart);
    let dispatch = useDispatch()

// async function handelSubmit(values)
// {
//   let response = await onlinePayment(cartId , values)
//   if(response?.data?.status ==='success'){
//    console.log(response.data.session.url);
//    window.location.href = response.data.session.url ;  //native js
//    console.log(response);
//   }
  
// }

const handleSubmit = async (values) => {
    const response = await dispatch(onlinePayment({ cartId, values }));
    if (response?.payload?.status === 'success') {
      window.location.href = response.payload.session.url; // Native JS
    } else {
      toast.error('Payment failed');
    }
  };

let validation = Yup.object({
  details :Yup.string().required("details is required").min(3,"details minlenght is 3").max(10,"details maxlenght is 10"),
  city:Yup.string().required("city is required"),
  phone :Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, 'phone must be valid number'),
})

 let formik = useFormik({
  initialValues:{
    details: '',
    phone: '',
    city: ''
  },
  validationSchema:validation,
  onSubmit:handleSubmit
 })

  return <>
  <div className='w-75 mx-auto  flex  justify-center flex-col mt-24' style={{height:"70vh"}}>
    <form onSubmit={formik.handleSubmit}>
     <label htmlFor='details'>details :</label>
     <input type='text' className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} name='details' id='details'/>
     {formik.errors.details && formik.touched.details ? <p  className='text-Red font-semibold ms-3'>{formik.errors.details}</p> : null}

     <label htmlFor='phone'>phone :</label>
     <input type='tel' className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' id='phone'/>
     {formik.errors.phone && formik.touched.phone ? <p  className='text-Red font-semibold ms-3'>{formik.errors.phone}</p> : null}

     <label htmlFor='city'>city :</label>
    <input type='text' className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name='city' id='city'/>
    {formik.errors.city && formik.touched.city ? <p  className='text-Red font-semibold ms-3'>{formik.errors.city}</p> : null}

    <button  type='submit' className='btn bg-main text-white w-100'>Pay</button>
     
    </form>

  </div>
  </>
}

