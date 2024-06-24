
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getproductsDetails } from '../Redux/ProductDetailsSlice';
import Slider from "react-slick";
import { useTheme } from '@mui/material';
import {
  getLoggedUsrCart,
  addToCart,
  setNumOfCartItems,
} from '../Redux/CartSlice';
import { getLoggedUserWishList, addToWishList, setCount } from '../Redux/WishListSlice';
import toast from 'react-hot-toast';
function ProductDetails() {
  const theme = useTheme()
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const productDetails = useSelector(state => state.productsDetails.productsDetails);
  const { cartId, numOfCartItems } = useSelector((state) => state.cart);
  const { count } = useSelector((state) => state.wishlist)
 

  useEffect(() => {
    setIsLoading(true);
    dispatch(getproductsDetails(id))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className='loading'><i className="text-main fa-solid fa-spinner fa-spin fa-2x"></i></div>;
  }

  if (!productDetails) {
    return <div>Error fetching product details.</div>;
  }

  const { images, title, description, price, ratingsAverage } = productDetails;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
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

  return (
    <div className='mt-12'>
      <div className="row align-items-center py-3">
        <div className='col-md-4 col-12'>
          <Slider {...settings}>
            {/* {images.map((image, e) => <img key={e} src={image} alt={`Image ${e}`}  />)} */}
            {productDetails?.images.map((image,e)=><img key={e} src={image}/>)}
          </Slider>
        </div>
        <div className='col-md-8 col-12 '>
          <h3 className={`mt-8  3xl:text-2xl lg:text-2xl md:text-xl sm:text-lg  xs:text-base xs:mb-0 head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{productDetails?.title}</h3>
          <p className={` p-2  3xl:text-lg lg:text-lg md:text-base sm:text-sm  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{productDetails?.description}</p>
          <div className='d-flex justify-content-between'>
            <span className={` 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{productDetails?.price} EGP</span>
            <div>
              <span className={`mx-2 head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>
                <i className='fas fa-star rating-color'></i>
                {productDetails?.ratingsAverage}
              </span>
              <span className='mx-2 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs' onClick={() => handleAddToWishList(productDetails?._id)}>
                <i className='fa-solid fa-heart-circle-plus text-danger fa-lg '> </i>
              </span>
            </div>
          </div>
          <button onClick={() => handleAddToCart(productDetails?._id)} className='btn bg-main text-white w-100 mt-3 3xl:text-lg lg:text-lg md:text-lg sm:text-base  xs:text-xxs'>+ Add</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
