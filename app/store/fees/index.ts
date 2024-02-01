// ** Redux Imports
import { Dispatch } from 'redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Axios Imports
import axios from 'axios';

// ** Third Party Imports
import format from 'date-fns/format';

// ** url
import apiUrl from '../../configs/url';
import { emptySingleStudent } from '../students';

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
        fees: data,
        total: response.data.count,
      },
    ];
    // console.log('data')
  }
);

// ** Add client
export const postFee = createAsyncThunk(
  'appPayment/postFee',
  async (
    data: { [key: string]: number | string | any },
    { getState, dispatch }: Redux
  ) => {
    const { student, amount } = data ?? '';
    const response = await axios.post(`${apiUrl.url}/fees_structure/add-fee/`, {
      student,
      amount
    });

    dispatch(emptySingleStudent());

    return response.data;
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

// ** Client deposits
export const getStudentFees = createAsyncThunk(
  'appDeposits/getStudentFees',
    async (params: { [key: string]: number | string | any }) => {
    const { id, page, pageSize, dates = [] } = params ?? ''

    let from_date = ''
    let to_date = ''
    
    if (dates.length) {
      const [start, end] = dates
      from_date = format(new Date(start), 'dd-MM-yyyy')
      to_date = format(new Date(end), 'dd-MM-yyyy')
    }

    const response = await axios.get(
			`${apiUrl.url}/fees_structure/student-fees/${id}/?from_date=${from_date}&to_date=${to_date}&page=${page}&page_size=${pageSize}`
		);
    
    const data = response.data.results

    return [
      // 200,
      {
        fees: data,
        total: response.data.count
      }
    ]
  }
)

export const feesSlice = createSlice({
  name: 'fees',
  initialState: {
    data: [],
    total: 1,
    status: '',
    feeStatus: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload[0].fees;
        state.total = action.payload[0].total;
      })
      .addCase(postFee.fulfilled, (state) => {
        state.status = 'succeeded';
        state.feeStatus = 'succeeded';
      })
      .addCase(postFee.rejected, (state) => {
        state.status = 'failed';
        state.feeStatus = 'failed';
      })
      .addCase(getStudentFees.fulfilled, (state, action) => {
        state.data = action.payload[0].fees
        state.total = action.payload[0].total
      })
      .addCase(getStudentFees.rejected, (state) => {
        state.data = []
        state.total = 0
      })
  },
});

export default feesSlice.reducer;
