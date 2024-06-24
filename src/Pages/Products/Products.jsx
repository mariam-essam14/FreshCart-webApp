import React, { useEffect, useState } from 'react'
import { getProducts } from '../Redux/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Products.css'
import {
  getLoggedUsrCart,
  addToCart,
  setNumOfCartItems,
} from '../Redux/CartSlice';
import { getLoggedUserWishList, addToWishList, setCount } from '../Redux/WishListSlice';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material'
function Products() {
  const theme = useTheme()
  const [Products, setProducts] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const { cartId, numOfCartItems } = useSelector((state) => state.cart);
  const { count } = useSelector((state) => state.wishlist)
  let dispatch = useDispatch()

  async function getProductsAll() {
    setisLoading(true)
    let data = await dispatch(getProducts())
    setProducts(data.payload)
    setisLoading(false)
  }
  useEffect(() => {
    dispatch(getLoggedUsrCart());
    getProductsAll()
  }, [dispatch])

  const handleAddToCart = async (productId) => {
    const response = await dispatch(addToCart(productId));
    if (response.payload.status === 'success') {
      dispatch(setNumOfCartItems(response.payload.numOfCartItems));
      toast.success(response.payload.message, { duration: 2000 });
    } else {
      toast.error('Error', { duration: 2000 });
    }
  };
  const handleAddToWishList = async (productId) => {
    const response = await dispatch(addToWishList(productId));
    if (response.payload.status === 'success') {
      dispatch(setCount(response.payload.data.length))
      toast.success(response.payload.message, { duration: 2000 });
    }
    else {
      toast.error('Error', { duration: 2000 });
    }
  }
  return <>
    {isLoading ? <div className='loading '>
      <i className="text-main fa-solid fa-spinner fa-spin fa-2x"></i>
    </div> : <> <div className="row   g-2">
      {Products.map((product) => <div key={product._id} className=' col-xxl-2 col-xl-3 col-md-3  col-sm-4 col-6 '>
        <div className="product cursor-pointer px-2 py-3 " >
          <Link to={'/ProductDetails/' + product._id} className='no-underline text-Black'>
            <img className='w-100' src={product.imageCover} />
            <span className='text-main fw-bold  3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-sm'>{product.category.name}</span>
            <h3 className={` fw-bolder 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
            <div className='d-flex justify-content-between '>
              <span className={`text-muted 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{product.price} EGP</span>
              <span className={`mx-2 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>
                <i className='fas fa-star rating-color'></i>
                {product.ratingsAverage}
              </span>
            </div>
          </Link>
          <div className='d-flex justify-content-between'>
            <button onClick={() => handleAddToWishList(product._id)} className='btn '><i className='fa-solid fa-heart-circle-plus text-danger fa-lg '> </i></button>
            <button onClick={() => handleAddToCart(product._id)} className='btn bg-main text-white 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs'>+Add</button>
          </div>

        </div>

      </div>)}
    </div>
    </>}
  </>

}

export default Products