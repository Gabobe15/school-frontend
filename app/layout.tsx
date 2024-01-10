'use client'

// components/Layout.tsx
// import type { AppProps } from 'next/app'

import React, { ReactNode } from 'react';
import Footer from './components/footer/Footer';
import Navbar from './components/navigation/navbar/Navbar';

// ** Store Imports
import { store } from './store'
import { Provider } from 'react-redux'




const Layout: React.FC<any> = ({ children }) => {
  

  return (
    <Provider store={store}>
    <html>
      {/* <CacheProvider value={emotionCache}> */}
        <body>
          {/* <AuthProvider>
          <Guard authGuard={authGuard} guestGuard={guestGuard} > */}
            {/* <Sidebar/> */}
            <main>
              <Navbar/>
              {children}
            </main>
              <Footer/>
          {/* </Guard>
          </AuthProvider> */}
        </body>
        {/* </CacheProvider> */}
      </html>
      </Provider>
  );
};

export default Layout;
