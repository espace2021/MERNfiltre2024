import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addOrder , fetchOrders, updateOrder , deleteOrder} from "../services/OrderService"

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

export const getOrders = createAsyncThunk(
  "order/getOrders",
  async ( _, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try{
    const res = await fetchOrders();
     return res;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const updateOrders = createAsyncThunk(
  "order/updateOrders",
  async (order, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try{ 
    const res = await updateOrder(order._id,order.status);
    return res;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const deleteOrders = createAsyncThunk(
  "order/deleteOrders",
  async (id, thunkAPI) => { 
    const { rejectWithValue } = thunkAPI;
    try{
    await deleteOrder(id);
    return  id ;
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
   
    //createOrder
    .addCase(createOrder.pending,(state,action)=>{
      state.isLoading=true;
      state.error=null;
     
    })
    .addCase(createOrder.fulfilled,(state, action) => {
      state.isLoading=false;
      state.error = null;
      state.orders=action.payload;
     
    })
    .addCase(createOrder.rejected, (state, action) => {
      state.isLoading=false;
      state.error=action.payload;
   
      console.log("impossible de se connecter au serveur")
    })

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
    
    //updateOrders
        .addCase(updateOrders.pending,(state, action) => {
          state.isLoading=true;
          state.error=null;  
          state.success=null;  
        })
        .addCase(updateOrders.fulfilled, (state, action) => {
          
          state.orders = state.orders.map((item) =>
              item._id === action.payload._id ? action.payload : item
            ); 
          state.isLoading=false;
          state.error=null; 
          state.success=action.payload;
             })
        .addCase(updateOrders.rejected, (state, action) => {
              state.isLoading=false;
              state.error=action.payload;
           
              console.log("impossible de se connecter au serveur")
            })
      
    //deleteOrders
      .addCase(deleteOrders.pending, (state, action) => {
        state.isLoading=true;
        state.error=null; 
        
      })
      .addCase(deleteOrders.fulfilled, (state, action) => {
        state.orders=state.orders.filter((item)=> item._id!==action.payload)
        state.isLoading=false;
        state.error=null; 
        
        })
        .addCase(deleteOrders.rejected,(state, action) => {
        state.isLoading=false;
        state.error=action.payload;    
         
      })     
  }
});
export default orderSlice.reducer;
