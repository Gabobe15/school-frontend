// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** url
import apiUrl from '../../configs/url'

interface DataParams {
  q: string
  page: number
  pageSize: number
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appUsers/fetchData', 
  async (params: DataParams ) => {
    const { q = '', page, pageSize} = params ?? ''
    const queryLowered = q.toLowerCase()

    const response = await axios.get(`${apiUrl.url}/users_app/users/?page=${page}&page_size=${pageSize}&search=${queryLowered}`)
    
    const data = response.data.results

  return [
    {
      users: data,
      total: response.data.count
    }
  ]
})


export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
  },
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].users
      state.total = action.payload[0].total
    })
 
  }
})

export default appUsersSlice.reducer