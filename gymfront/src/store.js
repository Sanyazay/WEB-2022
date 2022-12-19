import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/dataSlice"


export default configureStore({
    reducer: combineReducers({
        ourData: dataReducer
    })
})