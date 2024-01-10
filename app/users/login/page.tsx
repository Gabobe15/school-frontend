"use client"

import React from 'react'
import LoginPage from './LoginForm'
import { Box as MuiBox, styled } from "@mui/material";

const StyledBox = styled(MuiBox) ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center"

})
const LoginPagee = () => {
  return (
    <StyledBox>
      <LoginPage/>
    </StyledBox>
  )
}

// LoginPagee.guestGuard = true

export default LoginPagee