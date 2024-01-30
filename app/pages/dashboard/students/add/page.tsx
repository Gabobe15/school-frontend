'use client';

// ** React Imports
import React, { MouseEvent, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader, CardHeaderProps, Grid, Collapse } from '@mui/material';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';

// ** Axios
import axios from 'axios';

import { signIn } from 'next-auth/react';

// ** Config
// import authConfig from
import authConfig from '../../../../configs/auth';
// import url from '../../../../configs/url';

// ** Third Party Imports
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

// ** Icon Imports
import Icon from '../../../../icon';

import { useRouter, usePathname } from 'next/navigation';
// import { Icon } from '@iconify/react/dist/iconify.js';

// interface State {
//   showPassword: boolean;
//   showConfirmPassword: boolean;
// }

interface UserData {
  regno: string;
  fullname: string;
  course: string;
  email: string;
  contact: string;
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
  contact: yup
    .string()
    .typeError('Mobile Number field is required')
    .min(10, (obj) => showErrors('Mobile Number', obj.value.length, obj.min))
    .required(),
  fullname: yup
    .string()
    .min(3, (obj) => showErrors('Fullname', obj.value.length, obj.min))
    .required(),
  role: yup
    .string()
    .min(3, (obj) => showErrors('Role', obj.value.length, obj.min))
    .required(),
});

const defaultValues = {
  regno: '',
  fullname: '',
  course: '',
  email: '',
  contact: '',
  role: '',
};

const StyledCardHeader = styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

const RegisterForm = () => {
  // ** State
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  // ** Hooks
  //   const auth = useAuth()
  const router = useRouter();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserData) => {
    const { regno, fullname, course, email, contact, role } = data;

    // auth.register({ first_name, last_name, email, mobile, password, role }, (res) => {
    //   if (res.data?.user) {zz
    //     setMessage("User created successfully.")
    //     setIsError(false)
    //     reset()
    //   } else if (res?.response?.data?.email) {
    //     setIsError(true)
    //     setMessage("Email already exists!")
    //   } else {
    //     setIsError(true)
    //     setMessage("An error occurred! Try again.")
    //   }
    // })

    axios
      .post(authConfig.registerStudent, {
        regno,
        fullname,
        course,
        email,
        contact,
        role,
      })
      .then(async (res) => {
        console.log(res.data.user);

        const resp = await signIn('credentials', {
          //   email: email,
          //   password: password,
          redirect: false,
          // callbackUrl: '/pages/about'
        });

        if (!resp?.error) {
          console.log(res?.status);
          router.push('/pages/dashboard/students/list');
          router.refresh();
        }

        // if (res?.response.data.email) {
        //       setIsError(true)
        //       setMessage("Email already exists!")
        //   }

        setIsError(false);
        // return res.data.user;
      });
    // .catch((error) => {
    //   console.log(error.response);
    //   throw new Error(error.response.data.message);
    // })

    // console.log(data)

    setOpen(true);
  };

  return (
    <div>
      <Card sx={{ ml: 9, m: 5 }}>
        <StyledCardHeader
          title="Add Student"
          sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }}
        />
        <CardContent>
          <Collapse in={open} sx={{ maxWidth: '600px', margin: 'auto', mb: 6 }}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color={isError ? 'error' : 'success'}
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Icon icon="mdi:close" />
                </IconButton>
              }
              severity={isError ? 'error' : 'success'}
            >
              {message}
            </Alert>
          </Collapse>
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
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel error={Boolean(errors.role)} id="role-select">
                    Category
                  </InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        fullWidth
                        value={value}
                        id="select-role"
                        label="Field"
                        labelId="role-select"
                        onChange={onChange}
                        error={Boolean(errors.role)}
                        inputProps={{ placeholder: 'Select Role' }}
                      >
                        <MenuItem value="">Field</MenuItem>
                        <MenuItem value="it">IT</MenuItem>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="engineering">Engineering</MenuItem>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
