import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLogs = createAsyncThunk("logs/getLogs",async(args)=>{
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}`)
  console.log(res)
  return []
}) 

const initialState = {
  logs: [],
  isLoading:true
}

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(getLogs.pending, (state, { payload }) => {
      state.isLoading = true
    })
    builder.addCase(getLogs.fulfilled, (state, { payload }) => {
      state.logs = payload
      state.isLoading = false
    })
    builder.addCase(getLogs.rejected, (state, action) => {
      state.isLoading = true
      
    })
  },
})


export default logsSlice.reducer