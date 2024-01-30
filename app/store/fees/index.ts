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
  'feepayments/fetchData',
  async (params: DataParams) => {
    const { q = '', page, pageSize } = params ?? '';
    const queryLowered = q.toLowerCase();

    const response = await axios.get(
      `${apiUrl.url}/fees_structure/fees/?page=${page}&page_size=${pageSize}&search=${queryLowered}`
    );

    const data = response.data.results;

    return [
      {
        feepayments: data,
        total: response.data.count,
      },
    ];
    // console.log('data')
  }
);

// ** Deactivate Student
export const deactivatePayment = createAsyncThunk(
  'appPayment/deactivatePayment',
  async (
    data: { [key: string]: number | string | any },
    { dispatch }: Redux
  ) => {
    const id = data.id;
    const response = await axios.patch(
      `${apiUrl.url}/fees_structure/update-user/${id}/`,
      {
        is_active: false,
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

export const feesSlice = createSlice({
  name: 'fees',
  initialState: {
    data: [],
    total: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload[0].feepayments;
      state.total = action.payload[0].total;
    });
  },
});

export default feesSlice.reducer;
