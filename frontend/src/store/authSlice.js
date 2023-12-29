import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  token:null,
  userName:null,
  isSigned:false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state,action)=>{
      state.token = action.payload.token
      state.userName = action.payload.userName
      state.isSigned = true
      Cookies.set(`${process.env.REACT_APP_TOKEN_COOKIE_NAME}`,action.payload.token)
      Cookies.set(`${process.env.REACT_APP_USERNAME_COOKIE_NAME}`,action.payload.userName)
    },
    logout:(state)=>{
      state.token = null
      state.userName = null
      state.isSigned = false
    }
  },
 
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer