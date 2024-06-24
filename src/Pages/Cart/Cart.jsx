import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import cart from '../../image/cart/preview-Photoroom.png-Photoroom.png'
import './Cart.css'
import {
    getLoggedUsrCart,
    setNumOfCartItems,
    setCartDetails,
    removeItem,
    updateProductCount,
    removeAllCart
} from '../Redux/CartSlice';
import { getLoggedUserWishList, addToWishList, setCount } from '../Redux/WishListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, useTheme } from '@mui/material';
function Cart() {
 const theme = useTheme()
    const { cartId, numOfCartItems, cartDetails } = useSelector((state) => state.cart);
    const { count } = useSelector((state) => state.wishlist)
    let dispatch = useDispatch()
    // const [cartDetails, setcartDetails] = useState(null)

    useEffect(() => {
        dispatch(getLoggedUsrCart()).then((response) => {
            if (response.payload.status === 'success') {
                dispatch(setNumOfCartItems(response.payload.numOfCartItems));
                dispatch(setCartDetails(response.payload.data));
            }
        });
    }, [dispatch]);




    const handleDeleteItem = async (productId) => {
        const response = await dispatch(removeItem(productId));
        if (response.payload.status === 'success') {
            dispatch(setNumOfCartItems(response.payload.numOfCartItems));
            dispatch(setCartDetails(response.payload.data));
            toast('Product removed');
        }
    };

    const handleDeleteAllCart = async () => {
        const response = await dispatch(removeAllCart());
        if (response.payload.message === 'success') {
            dispatch(setNumOfCartItems(0));
            dispatch(setCartDetails(null));
            toast('All Products is Removed')
        }

    };
    const updateProductQuantity = async (productId, count) => {
        const response = await dispatch(updateProductCount({ productId, count }));
        if (response.payload.status === 'success') {
            dispatch(setCartDetails(response.payload.data));
            if (count >= 1) {
                toast('Product count updated');
            } else {
                handleDeleteItem(productId);
            }
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
        {/* <Helmet>
            <title>FreshCart/Cart</title>
        </Helmet> */}


        {cartDetails !== null ? <div className="row  flex-col rowCart pt-20 ">
        <h1 className='text-Black fw-bold  textCart '>My Cart :</h1>
            {cartDetails?.products.map((product) => {
                return <>
                    <div className="col" key={product?.product._id}>
                        <div className="row">
                            <div className=" col-xxl-5 col-xl-5 col-md-6 col-sm-12 col-12    flex  3xl:justify-start 2xl:justify-start xl:justify-start lg:justify-start md:justify-center sm:justify-center xs:justify-center">

                                <img src={product?.product.imageCover} className='w-36 3xl:h-36 2xl:h-36 xl:h-36 lg:h-36 md:h-36 sm:h-32 xs:h-32' />

                            </div>
                            <div className="col-xxl-3 col-xl-3 col-md-6 col-sm-12 col-12    flex justify-center flex-col ">
                                <p className= {`md:mb-4 sm:mb-2 xs:mb-2 3xl:mt-0 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-1 sm:mt-1 xs:mt-1 head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{product?.product.title}</p>
                                <h5 className={`head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{product?.price} EGP</h5>
                            </div>
                            <div className="col-xxl-3 col-xl-3 col-md-12 col-sm-12   flex justify-center flex-col">
                                <div className="row   ">
                                    <div className="col-6  ">
                                        <div className='flex justify-between  3xl:mt-0 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-1 sm:mt-1 xs:mt-1'>
                                            <span> <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)} className={`btn border-main btn-sm ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`} >+</button>
                                                <span className={`mx-2 head ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>{product?.count}</span>
                                                <button onClick={() => updateProductQuantity(product?.product._id, product.count - 1)} className={`btn border-main btn-sm ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>-</button></span>
                                            <span><button onClick={() => handleDeleteItem(product?.product._id)} className='btn m-0 p-0'><i className='fa-regular text-danger fa-trash-can fa-lg'></i></button></span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className='flex justify-center 3xl:mt-0 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-1 sm:mt-1 xs:mt-1'>
                                            <p><button  onClick={() => handleAddToWishList(product?.product._id)} className='btn m-0 p-0'><i className='fa-solid text-danger fa-heart fa-lg'></i></button></p>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>
                    </div>
                    <Divider className='bg-Black my-2' /></>
            })}
            <div className="row bg-GreenLight rowCart bg-opacity-60 rounded-md">
                <div className="col-12 flex justify-center items-center p-2 ">
                    <p className={`fw-bold mb-0 ${theme.palette.mode==='light'? 'text-Black':'text-white'}`}>
                        Total: {cartDetails?.totalCartPrice} EGP
                    </p>

                </div>
            </div>



            <div className='px-0'>
                <button onClick={handleDeleteAllCart} className='btn btn-outline-danger my-2 me-2'>Remove All Cart</button>
                <button className='btn bg-main my-2'>
                    <Link className='text-white no-underline' to={'/Checkout'}>
                        Checkout
                    </Link>
                </button>
            </div>

        </div> : <div className='flex justify-center items-center flex-col h-svh'><img src={cart}  /></div>}

     



    </>
}

export default Cart