// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** url
import apiUrl from '../../configs/url';
import { log } from 'console';

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
  'appStudents/fetchData',
  async (params: DataParams) => {
    const { q = '', page, pageSize } = params ?? '';
    const queryLowered = q.toLowerCase();

    const response = await axios.get(
      `${apiUrl.url}/mkuapi/students/?page=${page}&page_size=${pageSize}&search=${queryLowered}`
    );

    const data = response.data.results;

    return [
      {
        students: data,
        total: response.data.count,
      },
    ];
    // console.log('data');
  }
);

// ** Deactivate User
export const deactivateStd = createAsyncThunk(
  'appStudents/deactivateStd',
  async (
    data: { [key: string]: number | string | any },
    { dispatch }: Redux
  ) => {
    const id = data.id;
    const response = await axios.patch(`${apiUrl.url}/mkuapi/students/${id}/`, {
      is_active: false,
    });

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

export const appStudentsSlice = createSlice({
  name: 'appStudents',
  initialState: {
    data: [],
    total: 1,
    status: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload[0].students;
        state.total = action.payload[0].total;
      })
      .addCase(deactivateStd.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deactivateStd.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default appStudentsSlice.reducer;
