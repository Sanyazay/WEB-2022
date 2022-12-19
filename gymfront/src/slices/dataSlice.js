import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [],
        isAuth: 0,
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data = payload
        },
        setAuthOn(state) {  // суммируем цены выбранных товаров
            state.isAuth = 1
        },
        setAuthOff(state) {  // обнуляем сумму выбранных товаров
            state.isAuth = 0
        }
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const useAuth = () =>
    useSelector((state) => state.ourData.isAuth)

export const {
    setData: setDataAction,
    setAuthOn: setAuthOnAction,
    setAuthOff: setAuthOff
} = dataSlice.actions


export default dataSlice.reducer