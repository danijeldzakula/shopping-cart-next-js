import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import uceCartSlice from "./reducers/cartSlice";
import storage from "./storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "cart",
  storage: storage,
};

export const rootReducers = combineReducers({
  cart: uceCartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

setupListeners(store.dispatch);

export default store;
