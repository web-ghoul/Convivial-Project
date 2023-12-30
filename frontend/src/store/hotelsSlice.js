import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

export const getHotels = createAsyncThunk("hotels/getHotels",async(args)=>{
  const token = Cookies.get(`${process.env.REACT_APP_TOKEN_COOKIE_NAME}`)
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/searchHotels?search=${args?.search}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.data.data
}) 

const initialState = {
  hotels: [],
  isLoading:true
}

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getHotels.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getHotels.fulfilled, (state, { payload }) => {
      state.hotels = payload
      state.isLoading = false
    })
    builder.addCase(getHotels.rejected, (state, action) => {
      state.isLoading = true
      
    })
  },
})


export default hotelsSlice.reducer