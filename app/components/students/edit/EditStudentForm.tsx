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
import { getSingleStudent, updateStudent } from '../../../store/students';

// ** Types Imports
import { AppDispatch, RootState } from '../../../store';
import { useSelector } from 'react-redux';

// ** Context
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

// ** Icon Imports
import Icon from '../../../icon';

interface UserData {
  regno: string;
  fullname: string;
  course: string;
  email: string;
  contact: string;
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
  contact: yup
    .string()
    .typeError('Mobile Number field is required')
    .min(10, (obj) => showErrors('Mobile Number', obj.value.length, obj.min))
    .required(),
  fullname: yup
    .string()
    .min(3, (obj) => showErrors('Fullname', obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  regno: '',
  fullname: '',
  course: '',
  email: '',
  contact: '',
};

const EditStudentForm = ({ id }: any) => {
  // ** State
  const [open, setOpen] = useState(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSingleStudent({ id }));
  }, [dispatch, id]);

  const store = useSelector((state: RootState) => state.students);

  const student: any = store.singleStudent;

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
    dispatch(getSingleStudent({ id }));
    reset({}, { keepValues: true });
  };

  // Update the defaultValues with the user data
  useEffect(() => {
    setValue('regno', student?.regno);
    setValue('fullname', student?.fullname);
    setValue('course', student?.course);
    setValue('email', student?.email);
    setValue('contact', student?.contact);
  }, [setValue, student]);

  // Listen if the defaultValues changed
  useEffect(() => {
    // console.log(isDirty)
    // console.log(dirtyFields)
  }, [isDirty, dirtyFields]);

  const onSubmit = (data: UserData) => {
    dispatch(updateStudent({ ...data, id }));
    setOpen(true);

    reset({}, { keepValues: true });
  };

  return (
    <Card>
      <CardHeader title="Edit Student" />
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
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name="regno"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="regno"
                    onChange={onChange}
                    placeholder="course/year/regno"
                    error={Boolean(errors.regno)}
                  />
                )}
              />
              {errors.regno && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.regno.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="Full Name"
                    onChange={onChange}
                    placeholder="Abdi ali"
                    error={Boolean(errors.fullname)}
                  />
                )}
              />
              {errors.fullname && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.fullname.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                name="course"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="Course"
                    onChange={onChange}
                    placeholder="Choose your field"
                    error={Boolean(errors.course)}
                  />
                )}
              />
              {errors.course && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.course.message}
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
                name="contact"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type="number"
                    value={value}
                    label="Contact"
                    onChange={onChange}
                    placeholder="0712 345 678"
                    error={Boolean(errors.contact)}
                  />
                )}
              />
              {errors.contact && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.contact.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit" sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button
              type="reset"
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default EditStudentForm;
