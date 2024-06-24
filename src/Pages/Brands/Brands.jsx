import React , { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getBrands } from '../Redux/BrandSlice'

function Brands() {
  const [Brands , setBrands]= useState([])
    const [isLoading, setisLoading] = useState(false)
   let dispatch = useDispatch()

   async function getBrandsAll(){
    setisLoading(true)
    let data = await dispatch(getBrands())
    setBrands(data.payload)
    setisLoading(false)
   }

   useEffect(()=>{
    getBrandsAll()
   },[])
  return  <>
  {isLoading ? <div className='loading '>
    <i className="text-main fa-solid fa-spinner fa-spin fa-2x"></i>
  </div> : <><div className='mt-16'>
  <div className="row g-2">
    {Brands.map((Brands) =><div key={Brands._id} className=' col-xxl-2 col-xl-3 col-md-3  col-sm-4 col-6 '>
      <div className="rounded-md cursor-pointer px-2 py-3 bg-GreenLight " >
          <img className='w-100 rounded-md' src={Brands.image} />
      </div>

    </div>)}
  </div>
  </div>
  
  </>}
</>
}

export default Brands