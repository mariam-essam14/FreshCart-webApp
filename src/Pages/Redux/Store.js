import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductsSlice";
import { productDetailsReducer } from "./ProductDetailsSlice";
import { BrandsReducer } from "./BrandSlice";
import { LoggedUsCartReducer, cartReducer } from "./CartSlice";
import {thunk} from "redux-thunk";
import wishListReducer  from './WishListSlice';


export let store = configureStore({
    reducer:{
        products :productReducer,
        productsDetails:productDetailsReducer,
        Brands:BrandsReducer,
        cart:cartReducer,
        wishlist: wishListReducer
        
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
}) 

export default store;