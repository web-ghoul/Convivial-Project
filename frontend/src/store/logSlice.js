import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLog = createAsyncThunk("log/getLog",async(args)=>{
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/displayPDF/${args.id}`)
  return res.data.data
}) 

const initialState = {
  log:null,
  isLoading:true
}

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    state:(state)=>{
    state.log=null
    state.isLoading=true
   }
  },
  extraReducers: (builder) => {
    builder.addCase(getLog.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getLog.fulfilled, (state, { payload }) => {
      state.log = payload
      state.isLoading = false
    })
    builder.addCase(getLog.rejected, (state, action) => {
      state.isLoading = true
      
    })
  },
})

export const {reset} = logSlice.actions
export default logSlice.reducer