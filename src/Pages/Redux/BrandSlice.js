import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk : to call Api

// state
let initialState = { Brands: [], isLoading: false };


// "products/getproducts"  : action type
export let getBrands = createAsyncThunk("Brands/getBrands", async () => {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    return data.data
});

let BrandsSlice = createSlice({
    name: 'Brands',
    initialState,
    extraReducers: (builder) => {
        builder.addCase("fullfiled", (state, action) => {
            state.Brands = action.payload;
        })
    }
});

export let BrandsReducer = BrandsSlice.reducer;

