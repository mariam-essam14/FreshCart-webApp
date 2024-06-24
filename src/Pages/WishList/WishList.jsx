// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux';
// import {getLoggedUserwishList ,setcount} from '../Redux/WishListSlice'
// import empty from '../../image/wishlist/empty-wishlist.png'
// function WishList() {

//   let dispatch = useDispatch()

//   const [wishListDetails, setwishListDetails] = useState(null)
//   const { count } = useSelector((state) => state.wishList);
//   // const[count, setcount]=useState(0)


//     async function handelGetLoggedUserwishList(){
//       let data = await dispatch(getLoggedUserwishList())
//       setcount(data.payload.data.lenght);
//       setwishListDetails(data.payload.data);
//     }

//     useEffect(()=>{

//       handelGetLoggedUserwishList()
//      },[])




//   return <>
//   {wishListDetails !== null ? <div  className="row p-4 my-4 g-3">
//       {wishListDetails?.map((item) =>{
//         return <div key={item?._id} className="col-md-3" >
//           <div className=' border border-1 h-100 rounded-md '>
//             <Link to={'/ProductDetails/'+item._id}>
//             <img src={item?.imageCover} className='w-100 rounded-md' height={300} /> 
//             </Link>
//             <div className='body mt-3 ms-2 '>
//               <h6 className='text-main'>{item?.title?.split(' ').slice(0, 2).join(' ')}</h6>
//               <p className='text-muted '>Brand :<span className='text-main fw-bold'>{item?.brand.name}</span> </p>
//               <p className='text-muted '>Price :<span className='text-main fw-bold'>{item?.price} EGP</span> 
//               </p>
//             </div>
//             <div className='d-flex justify-content-between m-2 '>
//               {/* <button onClick={() => deleteItemWishList((item?._id))} className='btn '><i className='fa-regular text-danger fa-trash-can fa-lg'></i></button>
//               <button onClick={() => addProductCart((item?._id))} className='btn bg-main text-white '>+Add</button> */}
//             </div>

//           </div>
//         </div>
//       })}
//     </div> : <div className='d-flex justify-content-center align-items-center p-3 flex-column'>
//        <img src={empty} className='w-50' />
//        <br/>
//        <p className='fw-bold'>Your WishList Is Empty</p>
//       </div>}
//   </>
// }

// export default WishList


import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUserWishList, removeItemWishList, addToWishList, setCount } from '../Redux/WishListSlice';
import { addToCart } from '../Redux/CartSlice';
import empty from '../../image/wishlist/shopping-bag (1).png';
import { Padding, WidthFullSharp } from '@mui/icons-material';
import { useTheme } from '@mui/material';

function WishList() {
    const theme = useTheme()
    const dispatch = useDispatch();
    // const { count, wishList, isLoading } = useSelector((state) => state.wishList);
    const { count = 0, wishList = [], isLoading = false } = useSelector((state) => state.wishlist || {});

    //   const { count, wishList, isLoading } = useSelector((state) => {
    //     console.log("Full state:", state);
    //     console.log("Wishlist state:", state.wishlist);
    //     return state.wishlist;
    // });

    useEffect(() => {
        dispatch(getLoggedUserWishList());
    }, [dispatch]);

    const handleAddToCart = async (productId) => {
        const response = await dispatch(addToCart(productId)); // Assuming you have this thunk in cartSlice
        if (response.payload.status === 'success') {
            toast.success(response.payload.message, { duration: 2000 });
        } else {
            toast.error('Error', { duration: 2000 });
        }
    };

    const handleRemoveItemWishList = async (productId) => {
        const response = await dispatch(removeItemWishList(productId));
        if (response.payload.status === 'success') {
            dispatch(setCount(response.payload.data.length));
            dispatch(getLoggedUserWishList()); // Fetch updated wishlist
            toast.success(response.payload.message, { duration: 2000 });
        } else {
            toast.error('Error removing product');
        }
    };


    return (
        <>
            {wishList && wishList.length > 0 ? (
                <div className="row p-4 my-4 g-3">
                    {wishList ?.map((item) => (
                        <div key={item?._id} className="col-xxl-2 col-xl-3 col-md-3  col-sm-4 col-12 ">
                            <div className={`border border-1 h-100 rounded-md ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>
                                <Link to={'/ProductDetails/' + item._id}>
                                    <img src={item?.imageCover} className='w-100 rounded-md' height={300} />
                                </Link>
                                <div className='body mt-3 ms-2 '>
                                    <h6 className='text-main fw-bold headFav '>{item?.title?.split(' ').slice(0, 2).join(' ')}</h6>
                                    <p className={` textbrand head  ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>Brand: <span className='text-main fw-bold'>{item?.brand.name}</span></p>
                                    <p className={` textbrand head  ${theme.palette.mode==='light'? 'LightMode':'DarkMode'}`}>Price: <span className='text-main fw-bold'>{item?.price} EGP</span></p>
                                </div>
                                <div className='d-flex justify-content-between m-2 '>
                                    <button onClick={() => handleRemoveItemWishList((item?._id))} className='btn '><i className='fa-regular text-danger fa-trash-can fa-lg'></i></button>
                                    <button onClick={() => handleAddToCart((item?._id))} className='btn bg-main text-white '>+Add</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                 <div className='d-flex justify-content-center align-items-center p-3 flex-column h-svh'>
                <img src={empty} className='w-40 h-40' />
                <br />
                <p className={`fw-bold head ${theme.palette.mode === 'light' ? 'LightMode' : 'DarkMode'}`}>Your WishList Is Empty</p>
            </div>
            )}

          
        </>
    );

}

export default WishList;

