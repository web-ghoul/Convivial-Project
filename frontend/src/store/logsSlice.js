import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

export const getLogs = createAsyncThunk("logs/getLogs",async(args)=>{
  const token = Cookies.get(`${process.env.REACT_APP_TOKEN_COOKIE_NAME}`)
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/displayLogs?page=${args.count}&search=${args.search}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.data
}) 

const initialState = {
  logs: [],
  totalLogs: 0,
  isLoading:true
}

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getLogs.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLogs.fulfilled, (state, { payload }) => {
      state.logs = payload.data
      state.totalLogs = payload.totalLogs
      state.isLoading = false
    })
    builder.addCase(getLogs.rejected, (state, action) => {
      state.isLoading = true
      
    })
  },
})


export default logsSlice.reducer