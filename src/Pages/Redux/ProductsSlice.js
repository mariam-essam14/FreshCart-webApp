import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk : to call Api

// state
let initialState = { products: [], isLoading: false };


// "products/getproducts"  : action type
export let getProducts = createAsyncThunk("products/getproducts", async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    return data.data
});

let productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase("fullfiled", (state, action) => {
            state.products = action.payload;
        })
    }
});

export let productReducer = productSlice.reducer;

