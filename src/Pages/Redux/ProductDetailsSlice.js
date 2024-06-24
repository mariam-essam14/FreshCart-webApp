
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk: to call API
export const getproductsDetails = createAsyncThunk(
  "productsDetails/getproductsDetails",
  async (id) => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    return data.data;
  }
);

// State
const initialState = { productsDetails: null, isLoading: false };

const productsDetailsSlice = createSlice({
  name: 'productsDetails',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getproductsDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getproductsDetails.fulfilled, (state, action) => {
      state.productsDetails = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getproductsDetails.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { reducer: productDetailsReducer } = productsDetailsSlice;
