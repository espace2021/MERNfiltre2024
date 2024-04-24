import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from "../features/articleSlice"
import scategoriesReducer from "../features/scategorieSlice"
import cartsliceReducer from "../features/cartSlice"
import categoriesReducer from "../features/categorieSlice"

import ordersReducer from "../features/orderSlice"

import authReducer from "../features/AuthSlice"

import {persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartsliceReducer)

const persistedReducerAuth = persistReducer(persistConfig, authReducer)

const store = configureStore({
reducer: {
storearticles:articlesReducer,
storescategories: scategoriesReducer,
storecart:persistedReducer,
storecategories : categoriesReducer,
storeorders : ordersReducer,
auth:persistedReducerAuth
},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
export default store
