
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    error: null,
    count: 0,
    wishList: [],
};

const headers = {
    token: localStorage.getItem('userToken'),
};

export const getLoggedUserWishList = createAsyncThunk(
    'wishList/getLoggedUserWishList',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addToWishList = createAsyncThunk(
    'wishList/addToWishList',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const removeItemWishList = createAsyncThunk(
    'wishList/removeItemWishList',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const wishListSlice = createSlice({
    name: 'wishList',
    initialState,
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedUserWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoggedUserWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishList = action.payload.data;
                state.count = action.payload.data.length;
            })
            .addCase(getLoggedUserWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.message;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.wishList = state.wishList.filter((item) => item._id !== action.meta.arg);
                state.count = action.payload.data.length;
            })
            .addCase(removeItemWishList.fulfilled, (state, action) => {
                state.wishList = state.wishList.filter((item) => item._id !== action.meta.arg);
                state.count = action.payload.data.length;
            });
    },
});

export const { setCount } = wishListSlice.actions;

export default wishListSlice.reducer;

