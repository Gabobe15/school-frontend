'use client';

import React from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import Logo from './Logo';
import Button from './Button';
import ThemeToggleButton from '../../ThemeToggleButton';

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Navbar = (props: HeaderProps) => {
  const theme = useTheme();
  const { ColorModeContext } = props;
  // const StyledAppBar = styled(AppBar)({
  //   backgroundColor: 'white',
  //   coloe: 'black',
  // });

  const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    height: '100%',
  });

  const StyledLink = styled(Link)({
    textDecoration: 'none',
  });

  // const NavLink = styled(Typography)({
  //   color: theme.palette.common.black,
  //   textDecoration: 'none',
  //   '&:hover': {
  //     color: theme.palette.secondary.main,
  //   },
  // });

  return (
    <Box position="sticky">
      <StyledContainer maxWidth="xl">
        <Logo />
        <nav>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              gap: '20px',
              textDecoration: 'none',
            }}
          >
            <li>
              <StyledLink href="/pages/about" passHref>
                <Typography variant="body1">About Us</Typography>
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/pages/services" passHref>
                <Typography variant="body1">Services</Typography>
              </StyledLink>
            </li>
            <li>
              <StyledLink href="/pages/contact" passHref>
                <Typography variant="body1">Contacts</Typography>
              </StyledLink>
            </li>
          </ul>
        </nav>
        <ThemeToggleButton ColorModeContext={ColorModeContext} />

        <Button />
      </StyledContainer>
    </Box>
  );
};

export default Navbar;
