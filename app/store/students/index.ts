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
  role: string;
}

interface Redux {
  getState: any;
  dispatch: Dispatch<any>;
}

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appStudents/fetchData',
  async (params: DataParams) => {
    const { q = '', page, role = '', pageSize } = params ?? '';
    const queryLowered = q.toLowerCase();

    const response = await axios.get(
      `${apiUrl.url}/mkuapi/students/?page=${page}&page_size=${pageSize}&role=${role}&search=${queryLowered}`
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

// ** Get Single Student by regno
export const getSingleStudentByRegNo = createAsyncThunk(
  'appStudents/getSingleStudentByRegNo',
  async (params: { [key: string]: number | string | any }) => {
    const regno = parseInt(params.regno);
    const response = await axios.get(
      `${apiUrl.url}/mkuapi/single-student-by-regno/${regno}/`
    );

    return [
      // 200,
      {
        student: response.data,
      },
    ];
  }
);

// ** Deactivate student
export const deactivateReactivateStd = createAsyncThunk(
  'appStudents/deactivateReactivateStd',
  async (
    data: { [key: string]: number | string | any },
    { dispatch }: Redux
  ) => {
    const id = data.id;
    const response = await axios.patch(
      `${apiUrl.url}/mkuapi/update-student/${id}/`,
      {
        is_active: data.is_active,
      }
    );

    dispatch(
      getSingleStudent({
        id,
      })
    );
    return response.data;
  }
);

// ** Update User
export const updateStudent = createAsyncThunk(
  'appStudent/updateStudent',
  async (data: { [key: string]: number | string | any }) => {
    const id = data.id;
    const response = await axios.patch(
      `${apiUrl.url}/mkuapi/update-student/${id}/`,
      {
        regno: data.regno,
        fullname: data.fullname,
        course: data.course,
        email: data.email,
        contact: data.contact,
        role: data.role,
      }
    );

    return response.data;
  }
);

// ** Get Single User
export const getSingleStudent = createAsyncThunk(
  'appStudent/getSingleStudent',
  async (params: { [key: string]: number | string | any }) => {
    const { id } = params ?? '';
    const response = await axios.get(
      `${apiUrl.url}/mkuapi/single-student/${id}/`
    );

    return [
      // 200,
      {
        student: response.data,
      },
    ];
  }
);

export const appStudentsSlice = createSlice({
	name: 'appStudents',
	initialState: {
		data: [],
		total: 1,
		status: '',
		singleStudent: null,
	},
	reducers: {
		emptySingleStudent: (state) => {
			state.singleStudent = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.fulfilled, (state, action) => {
				state.data = action.payload[0].students;
				state.total = action.payload[0].total;
			})
			.addCase(getSingleStudent.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.singleStudent = action.payload[0].student;
			})
			.addCase(getSingleStudent.rejected, (state) => {
				state.status = 'failed';
				state.singleStudent = null;
			})
			.addCase(getSingleStudentByRegNo.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.singleStudent = action.payload[0].student;
			})
			.addCase(getSingleStudentByRegNo.rejected, (state) => {
				state.status = 'failed';
				state.singleStudent = null;
			})
			.addCase(deactivateReactivateStd.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(deactivateReactivateStd.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(updateStudent.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(updateStudent.rejected, (state) => {
				state.status = 'failed';
			});
	},
});

export const { emptySingleStudent } = appStudentsSlice.actions;
export default appStudentsSlice.reducer;
