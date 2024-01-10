"use client"

import React from "react";
import Link from "next/link";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import Logo from "./Logo";
import Button from "./Button"

const Navbar = () => {
  const theme = useTheme();

  const StyledAppBar = styled(AppBar)({
    backgroundColor: "white",
    coloe:'black'
  });

  const StyledContainer = styled(Container)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textDecoration: "none",
    height: "100%",
  });

  const StyledLink = styled (Link) ({
    textDecoration: "none",
  });

  const NavLink = styled(Typography)({
    color: theme.palette.common.black,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  });

  return (
    <StyledAppBar position="sticky">
      <StyledContainer maxWidth="xl">
        <Logo />
        <nav>
          <ul style={{ listStyle: "none", display: "flex", gap: "20px", textDecoration:"none" }}>
            <li>
              <StyledLink href="/pages/about" passHref>
                <NavLink variant="body1">
                  About Us
                </NavLink>
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/pages/services" passHref>
                <NavLink variant="body1">
                  Services
                </NavLink>
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/pages/contact" passHref>
                <NavLink variant="body1">
                  Contacts
                </NavLink>
              </StyledLink>
            </li>
          </ul>
        </nav>
        <Button/>
      </StyledContainer>
    </StyledAppBar>
  );
};

export default Navbar;