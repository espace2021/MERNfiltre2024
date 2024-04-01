import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addOrder} from "../services/OrderService"

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try{
    const res= await addOrder(order);
    return res.data
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState:{
    orders:[],
    isLoading: false,
    success:null,
    error:null,
  },
   
  extraReducers: (builder) => {
    builder
   
    //getOrders
    .addCase(getOrders.pending,(state,action)=>{
      state.isLoading=true;
      state.error=null;
     
    })
    .addCase(getOrders.fulfilled,(state, action) => {
      state.isLoading=false;
      state.error = null;
      state.orders=action.payload;
     
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.isLoading=false;
      state.error=action.payload;
   
      console.log("impossible de se connecter au serveur")
    })

  }
});
export default orderSlice.reducer;
