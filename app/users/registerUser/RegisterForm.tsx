'use client';

// ** React Imports
import React, { MouseEvent, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardHeader, CardHeaderProps, Grid, Collapse } from '@mui/material'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert';

// ** Axios
import axios from 'axios'

import { signIn } from "next-auth/react";

// ** Config
import authConfig from '../../configs/auth'


// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from '../../icon'

import { useRouter, usePathname } from 'next/navigation'



interface State {
  showPassword: boolean
  showConfirmPassword: boolean
}

interface UserData {
  first_name: string
  last_name: string
  email: string
  mobile: string
  role: string
  password: string
  confirmPassword: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  mobile: yup
    .string()
    .typeError('Mobile Number field is required')
    .min(10, obj => showErrors('Mobile Number', obj.value.length, obj.min))
    .required(),
  first_name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  last_name: yup
    .string()
    .min(3, obj => showErrors('Last Name', obj.value.length, obj.min))
    .required(),
  role: yup
    .string()
    .min(3, obj => showErrors('Role', obj.value.length, obj.min))
    .required(),
  password: yup
    .string()
    .required('Password can not be empty')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special case character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password can not be empty')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  role: '',
  password: '',
  confirmPassword: '',
  isManager: false,
}

const StyledCardHeader= styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.background.default
}))



const RegisterForm = () => {
  // ** State
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')

  // ** Hooks
  //   const auth = useAuth()
  const router = useRouter()

  const [values, setValues] = useState<State>({
    showPassword: false,
    showConfirmPassword: false,
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword })
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  
  const onSubmit = async (data: UserData) => {
    const { first_name, last_name, email, mobile, password, role  } = data
    let location  = "islii"

    // auth.register({ first_name, last_name, email, mobile, password, role }, (res) => {
    //   if (res.data?.user) {
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
      .post(authConfig.registerEndpoint, { first_name, last_name, email, mobile, password, role, location })
      .then(async res => {
        console.log(res.data.user)

        const resp = await signIn("credentials", { 
          email: email, 
          password: password, 
          redirect: false,
          // callbackUrl: '/pages/about' 
        });

        if(!resp?.error){
          console.log(res?.status)
          router.push('/dashboard')
          router.refresh()
        }

        // if (res?.response.data.email) {
        //       setIsError(true)
        //       setMessage("Email already exists!")
        //   }

          setMessage("User created successfully.")
          setIsError(false)
        // return res.data.user;
      })
      // .catch((error) => {
      //   console.log(error.response);
      //   throw new Error(error.response.data.message);
      // })

    // console.log(data)

    setOpen(true)
}


  return (
    <div>
      <Card sx={{ml:9, m:5}}>
          <StyledCardHeader title='Add User' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
          <Collapse in={open} sx={{ maxWidth: '600px', margin: 'auto', mb:6 }}>
              <Alert 
                action={
                  <IconButton
                  aria-label="close"
                  color={isError ? "error" : "success"}
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Icon icon='mdi:close' />
                  </IconButton>
                }
                severity={isError ? "error" : "success"}
              >
                { message }
              </Alert>
          </Collapse>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='first_name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='Hassan'
                      error={Boolean(errors.first_name)}
                    />
                  )}
                />
                {errors.first_name && <FormHelperText sx={{ color: 'error.main' }}>{errors.first_name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='last_name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      placeholder='Abdi'
                      error={Boolean(errors.last_name)}
                    />
                  )}
                />
                {errors.last_name && <FormHelperText sx={{ color: 'error.main' }}>{errors.last_name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='email'
                      value={value}
                      label='Email'
                      onChange={onChange}
                      placeholder='johndoe@email.com'
                      error={Boolean(errors.email)}
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller
                  name='mobile'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type='number'
                      value={value}
                      label='Mobile'
                      onChange={onChange}
                      placeholder='0712 345 678'
                      error={Boolean(errors.mobile)}
                    />
                  )}
                />
                {errors.mobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel
                  error={Boolean(errors.role)}
                  id="role-select"
                >
                  Select Role
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
                      label="Select Role"
                      labelId="role-select"
                      onChange={onChange} 
                      error={Boolean(errors.role)}
                      inputProps={{ placeholder: "Select Role" }}
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      <MenuItem value="director">Director</MenuItem>
                      <MenuItem value="chief executive officer">Chief executive officer</MenuItem>
                      <MenuItem value="managing director">Managing director</MenuItem>
                      <MenuItem value="general manager">General manager</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.role.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-new-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Password'
                      onChange={onChange}
                      id='input-new-password'
                      error={Boolean(errors.password)}
                      type={values.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-confirm-new-password' error={Boolean(errors.confirmPassword)}>
                  Confirm Password
                </InputLabel>
                <Controller
                  name='confirmPassword'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <OutlinedInput
                      value={value}
                      label='Confirm Password'
                      onChange={onChange}
                      id='input-confirm-new-password'
                      error={Boolean(errors.confirmPassword)}
                      type={values.showConfirmPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                          >
                            <Icon icon={values.showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormHelperText sx={{ color: 'error.main' }}>{errors.confirmPassword.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' sx={{ mr: 3 }}>
                Submit
              </Button>
              <Button type='reset' variant='outlined' color='secondary' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm