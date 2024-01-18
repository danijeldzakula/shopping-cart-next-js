import { createSlice } from "@reduxjs/toolkit";
import { cartReducerActions } from "../actions/cartActions";

const initialState = {
  cartItems: [],
  totalCount: 0,
  tax: 0,
  subAmount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: cartReducerActions,
});

export const {
  addCartProduct,
  getCartProducts,
  removeCartItem,
  getCartCount,
  getSubTotal,
  increment,
  decrement,
  calculateTax,
  getTotalAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
