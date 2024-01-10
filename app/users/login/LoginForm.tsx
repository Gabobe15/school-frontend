"use client";
// ** React Imports
import React, { useState, ReactNode } from 'react'

// ** Next Imports
import Link from 'next/link'

import { signIn } from "next-auth/react";

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


// ** Hooks
import { Divider } from '@mui/material'

import { useRouter, usePathname } from 'next/navigation'


// import { useSettings } from 'src/@core/hooks/useSettings'

// ** Configs
// import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
// import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
// import { useEffect } from 'react'

// ** Styled Components

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const StyledButton = styled(Button)({
  height: "48px", 
  borderRadius: "8px", 
  fontWeight: "bold",
  padding: "0 20px",
  background:"green",
  marginTop:"10px",
  marginLeft:"80px"
});

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const LogoImg = styled('img')(() => ({
  width: 150,
  height: 150,
  marginLeft: 0,
  borderRadius: 5
}))


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string>("")

  // ** Hooks
//   const theme = useTheme()
//   const { settings } = useSettings()
//   const hidden = useMediaQuery(theme.breakpoints.down('md'))
const router = useRouter()
  
  // ** Vars
//   const { skin } = settings

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data:FormData) => {
    const { email, password } = data
    
    try {
      const res = await signIn("credentials", { 
        email: email, 
        password: password, 
        redirect: false,
        // callbackUrl: '/pages/about' 
      });

      console.log(res?.status)
      
      if(!res?.error){
        console.log(res?.status)
        router.push('/pages/dashboard')
        router.refresh()
      }
    }
    catch(error) {
      setLoginError("Something went wrong!")
    }

    // console.log(data)
  }

  return (
    <Box sx={{ml:9}} className='content-center'>
      <RightWrapper>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
          <Box sx={{ m: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoImg alt='trophy' src='/images/logo.png' />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {/* {themeConfig.templateName} */}
            </Typography>
          </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='body2'>Please sign-in to your account</Typography>
            </Box> 
            {/* {message && <p style={{color:'crimson'}}>{message}</p>} */}
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                    
                      // autoFocus
                      label='Email'
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='Email address'
                    />
                  )}
                />
                {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4}}>
                <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                  Password
                </InputLabel>
                <Controller
                  name='password'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      value={value}
                      onBlur={onBlur}
                      label='Password'
                      onChange={onChange}
                      id='auth-login-v2-password'
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: 'error.main' }} id=''>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Box
                sx={{ mb: 4 }}
              >
                <Typography
                  variant='body2'
                  component={Link}
                  href='/forgot-password'
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
                Login
              </Button>
            </form>
            <Divider/>
            <StyledButton href='/users/registerUser' variant="contained">Create new User</StyledButton>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

// LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

// LoginPage.guestGuard = true

export default LoginPage