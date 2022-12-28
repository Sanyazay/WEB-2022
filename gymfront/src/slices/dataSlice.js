import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [],
        isAuth: 0,
        username:"",
        booly:0,
        Fav: []
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
        },
        setUsername(state,{payload}){
            state.username = payload
        },
        setBooly(state) {
            if (state.booly === 0) {
                state.booly = 1
            } else {
                state.booly = 0
            }
        },
        setFav(state,{payload}) {
            state.Fav = [];
            payload.map((x) => state.Fav.push(x))
        }

    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const useAuth = () =>
    useSelector((state) => state.ourData.isAuth)

export const useUser = () => 
    useSelector((state) => state.ourData.username)

export const useBooly = () => 
    useSelector((state) => state.ourData.booly)

export const useFav = () => 
    useSelector((state) => state.ourData.Fav)

export const {
    setData: setDataAction,
    setAuthOn: setAuthOnAction,
    setAuthOff: setAuthOffAction,
    setUsername: setUsernameAction,
    setBooly: setBoolyAction,
    setFav: setFavAction
} = dataSlice.actions


export default dataSlice.reducer