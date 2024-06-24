import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartId: null,
    numOfCartItems: 0,
    isLoading: false,
    error: null,
    cartDetails: null,
  };
  
  const headers = {
    token: localStorage.getItem("userToken"),
  };

  export const getLoggedUsrCart = createAsyncThunk("cart/getLoggedUsrCart", async () => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    });
    return response.data;
  });
  
  export const addToCart = createAsyncThunk("cart/addToCart", async (productId) => {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId: productId },
      { headers: headers }
    );
    return response.data;
  });
  
  export const removeItem = createAsyncThunk("cart/removeItem", async (productId) => {
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      headers: headers,
    });
    return response.data;
  });
  
  export const removeAllCart = createAsyncThunk("cart/removeAllCart", async () => {
    const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers,
    });
    return response.data;
  });
  
  export const updateProductCount = createAsyncThunk("cart/updateProductCount", async ({ productId, count }) => {
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: count },
      { headers: headers }
    );
    return response.data;
  });
  
  export const onlinePayment = createAsyncThunk("cart/onlinePayment", async ({ cartId, shippingAddress }) => {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      { shippingAddress: shippingAddress },
      { headers: headers }
    );
    return response.data;
  });
  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setNumOfCartItems: (state, action) => {
        state.numOfCartItems = action.payload;
      },
      setCartDetails: (state, action) => {
        state.cartDetails = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getLoggedUsrCart.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getLoggedUsrCart.fulfilled, (state, action) => {
          state.isLoading = false;
          state.numOfCartItems = action.payload.numOfCartItems;
          state.cartId = action.payload.data._id;
          state.cartDetails = action.payload.data;
        })
        .addCase(getLoggedUsrCart.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.numOfCartItems = action.payload.numOfCartItems;
        })
        .addCase(removeItem.fulfilled, (state, action) => {
          state.numOfCartItems = action.payload.numOfCartItems;
        })
        .addCase(removeAllCart.fulfilled, (state) => {
          state.numOfCartItems = 0;
          state.cartId = null;
          state.cartDetails = null;
        })
        .addCase(updateProductCount.fulfilled, (state, action) => {
          state.numOfCartItems = action.payload.numOfCartItems;
        })
        .addCase(onlinePayment.fulfilled, (state, action) => {
          state.cartId = action.payload;
        });
    },
  });
  
  export const { setNumOfCartItems ,  setCartDetails  } = cartSlice.actions;
  
  export const cartReducer = cartSlice.reducer;
  