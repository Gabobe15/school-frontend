// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// ** Store and Actions Imports
import { useDispatch } from 'react-redux';
// import { getSingleUser, updateUser } from '../../..'

// ** Types Imports
import { AppDispatch, RootState } from '../../../store';
import { useSelector } from 'react-redux';

// ** Context
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

// ** Icon Imports
import Icon from '../../../icon';
import { getSingleUser, updateUser } from '@/app/store/users';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  location: string;
  role: string;
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  mobile: yup
    .string()
    .typeError('Mobile Number field is required')
    .min(10, (obj) => showErrors('Mobile Number', obj.value.length, obj.min))
    .required(),
  first_name: yup
    .string()
    .min(3, (obj) => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  last_name: yup
    .string()
    .min(3, (obj) => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  location: yup
    .string()
    .min(3, (obj) => showErrors('Location', obj.value.length, obj.min))
    .required(),
  role: yup
    .string()
    .min(3, (obj) => showErrors('Role', obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  location: '',
  role: '',
};

const EditUserForm = ({ id }: any) => {
  // ** State
  const [open, setOpen] = useState(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSingleUser({ id }));
  }, [dispatch, id]);

  const store = useSelector((state: RootState) => state.users);

  const user: any = store.singleUser;

  const {
    setValue,
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const defaultData = () => {
    dispatch(getSingleUser({ id }));
    reset({}, { keepValues: true });
  };

  // Update the defaultValues with the user data
  useEffect(() => {
    setValue('first_name', user?.first_name);
    setValue('last_name', user?.last_name);
    setValue('email', user?.email);
    setValue('mobile', user?.mobile);
    setValue('location', user?.location);
    setValue('role', user?.role);
  }, [setValue, user]);

  // Listen if the defaultValues changed
  useEffect(() => {
    // console.log(isDirty)
    // console.log(dirtyFields)
  }, [isDirty, dirtyFields]);

  const onSubmit = (data: UserData) => {
    dispatch(updateUser({ ...data, id }));
    setOpen(true);

    reset({}, { keepValues: true });
  };

  return (
    <Card>
      <CardHeader title="Edit User" />
      <CardContent>
        <Collapse in={open} sx={{ maxWidth: '600px', margin: 'auto' }}>
          {store.status === 'succeeded' ? (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="success"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Icon icon="mdi:close" />
                </IconButton>
              }
              severity="success"
            >
              Updated successfully!
            </Alert>
          ) : (
            ''
          )}
          {store.status === 'failed' ? (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="error"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Icon icon="mdi:close" />
                </IconButton>
              }
              severity="error"
            >
              Could not update. An error occured!
            </Alert>
          ) : (
            ''
          )}
        </Collapse>
      </CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue={defaultValues.first_name}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="First Name"
                      onChange={onChange}
                      placeholder="Hassan"
                      error={Boolean(errors.first_name)}
                    />
                  )}
                />
                {errors.first_name && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.first_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Last Name"
                      onChange={onChange}
                      placeholder="Abdi"
                      error={Boolean(errors.last_name)}
                    />
                  )}
                />
                {errors.last_name && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.last_name.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="email"
                      value={value}
                      label="Email"
                      onChange={onChange}
                      placeholder="johndoe@email.com"
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="mobile"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="number"
                      value={value}
                      label="Mobile"
                      onChange={onChange}
                      placeholder="0712 345 678"
                      error={Boolean(errors.mobile)}
                    />
                  )}
                />
                {errors.mobile && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.mobile.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="role-select">Select Role</InputLabel>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      fullWidth
                      value={value}
                      id="select-role"
                      label="Select Role"
                      labelId="role-select"
                      onChange={onChange}
                      inputProps={{ placeholder: 'Select Role' }}
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="teller">Teller</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.role.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name="location"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label="Location"
                      onChange={onChange}
                      placeholder="Eastleigh"
                      error={Boolean(errors.location)}
                    />
                  )}
                />
                {errors.location && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors.location.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {isDirty ? (
                <>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    Save Changes
                  </Button>
                  <Button
                    type="reset"
                    variant="outlined"
                    color="secondary"
                    onClick={() => defaultData()}
                  >
                    Reset
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="submit"
                    disabled
                    variant="contained"
                    sx={{ mr: 3 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    type="reset"
                    disabled
                    variant="outlined"
                    color="secondary"
                    onClick={() => defaultData()}
                  >
                    Reset
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default EditUserForm;
