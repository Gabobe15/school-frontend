import React from "react";
import { Button as MuiButton, styled } from "@mui/material";

const StyledButton = styled(MuiButton)({
  height: "48px",
  borderRadius: "8px",
  fontWeight: "bold",
  padding: "0 20px",
});

const Button = () => {
  return <StyledButton href="/users/login" variant="contained">Sign In</StyledButton>;
};

export default Button;
