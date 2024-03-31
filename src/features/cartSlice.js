import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  cartTotal: 0,
};

const calculTotal =(Mycart)=>{
 return Mycart.reduce((accumulator, object) => {
    return parseFloat(accumulator) + parseFloat(object.prix * object.qty);
  }, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },
    addToCart: (state, action) => {
      const productData = action.payload;
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci._id === productData._id
      );

      if (productInCartIndex < 0) {
        state.cart.push(action.payload);
        state.cartTotal = calculTotal(state.cart)
      }
    },
    minusCart: (state, action) => {
      const productData = action.payload;
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci._id === productData._id
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }

      state.cartTotal = calculTotal(state.cart)
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((obj) => obj._id !== action.payload._id);

      state.cartTotal = calculTotal(state.cart)
    },
    plusCart: (state, action) => {
      const productData = action.payload;
      const productInCartIndex = state.cart.findIndex(
        (ci) => ci._id === productData._id
      );

      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty++;
      }

      state.cartTotal = calculTotal(state.cart)
    },
  },
});

export const { clearCart, addToCart, minusCart, removeFromCart, plusCart } = cartSlice.actions;
export default cartSlice.reducer;
