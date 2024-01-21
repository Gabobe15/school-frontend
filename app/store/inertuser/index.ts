// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** url
import apiUrl from '../../configs/url';

interface DataParams {
  q: string;
  page: number;
  pageSize: number;
}
interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}
// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appUsers/fetchData',
  async (params: DataParams) => {
    const { q = '', page, pageSize } = params ?? '';
    const queryLowered = q.toLowerCase();

    const response = await axios.get(
      `${apiUrl.url}/users/inactive/?page=${page}&page_size=${pageSize}&search=${queryLowered}`
    );

    const data = response.data.results;

    return [
      {
        users: data,
        total: response.data.count,
      },
    ];
  }
);

// ** Deactivate User
export const reactivateUser = createAsyncThunk(
  'appUsers/reactivateUser',
  async (
    data: { [key: string]: number | string | any },
    { dispatch }: Redux
  ) => {
    const id = data.id;
    const response = await axios.patch(
      `${apiUrl.url}/users/update-user/${id}/`,
      {
        is_active: true,
      }
    );

    dispatch(
      fetchData({
        q: '',
        page: 1,
        pageSize: 10,
      })
    );

    return response.data;
  }
);

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    status: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload[0].users;
        state.total = action.payload[0].total;
      })
      .addCase(reactivateUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(reactivateUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default appUsersSlice.reducer;
