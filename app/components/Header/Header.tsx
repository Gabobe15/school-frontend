import { useSession, signIn, signOut } from 'next-auth/react';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import NextLink from 'next/link';

import ThemeToggleButton from '../ThemeToggleButton';

export type HeaderProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const Header = (props: HeaderProps) => {
  const { ColorModeContext } = props;
  const theme = useTheme();
  const { data: session } = useSession();
  const userProfileImg = session?.user?.image as string;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const tabletCheck = useMediaQuery('(min-width: 768px)');

  return (
    <AppBar position="fixed" sx={{ marginBottom: '40px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DataSoft
          </Typography>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DataSoft
          </Typography>
          {tabletCheck && (
            <Box sx={{ paddingRight: 5, marginLeft: 'auto' }}>
              <Typography>Signed in as {session?.user?.email}</Typography>
            </Box>
          )}

          <ThemeToggleButton ColorModeContext={ColorModeContext} />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open profile settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.name as string}
                  src={userProfileImg}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <NextLink
                  href={'/pages/about'}
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: 'none',
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink
                  href={'/dashboard/settings'}
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: 'none',
                  }}
                >
                  <Typography textAlign="center">Settings</Typography>
                </NextLink>
              </MenuItem>

              <MenuItem onClick={() => (session ? signOut() : signIn())}>
                <Typography textAlign="center">
                  {session ? 'Logout' : 'Login'}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
