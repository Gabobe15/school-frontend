// ** React Imports
import { useEffect } from 'react';

// ** Next Import
import Link from 'next/link';

// ** MUI Imports
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

// ** Demo Components Imports
import StudentViewLeft from './StudentViewLeft';
import UserViewRight from './UserViewRight';

// ** Types
// import { UsersType } from 'src/types/apps/userTypes'

// ** Store
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
import { getSingleStudent } from '@/app/store/students';

const StudentView = ({ id }: any) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      getSingleStudent({
        id,
      })
    );
  }, [dispatch, id]);

  const store = useSelector((state: RootState) => state.students);
  const data = store.singleStudent;

  if (store.status === 'succeeded') {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft data={data} />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight data={data} />
        </Grid>
      </Grid>
    );
  } else if (store.status === 'failed') {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Alert severity="error">
            User with the id: {id} does not exist. Please check the list of
            users: <Link href="/pages/dashboard/users/list">User List</Link>
          </Alert>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default StudentView;
