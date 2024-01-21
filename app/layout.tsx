'use client';

// components/Layout.tsx
// import type { AppProps } from 'next/app'

import React, { ReactNode } from 'react';
// import Footer from './components/footer/Footer';

import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';

import { ThemeProvider, createTheme } from '@mui/material/styles';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

import scss from './Layout.module.scss';

// ** Store Imports
import { store } from './store';
import { Provider } from 'react-redux';
import Header from './components/Header';
import { SessionProvider } from 'next-auth/react';
import SideMenu from './components/SideMenu';
import { CssBaseline } from '@mui/material';

const Layout: React.FC<any> = ({ children, session }) => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const darkThemeChosen = React.useMemo(
    () => createTheme({ ...darkTheme }),
    [mode]
  );

  const lightThemeChosen = React.useMemo(
    () => createTheme({ ...lightTheme }),
    [mode]
  );

  return (
    <html>
      {/* <CacheProvider value={emotionCache}> */}
      <body>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider
            theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}
          >
            <SessionProvider session={session}>
              {/* <Sidebar/> */}
              <Provider store={store}>
                <CssBaseline/>
              <Header ColorModeContext={ColorModeContext} />
                <main className={scss.layout}>
                  <SideMenu />
                  {children}
                </main>
              </Provider>
              {/* <Footer /> */}
            </SessionProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </body>
    </html>
  );
};

export default Layout;
