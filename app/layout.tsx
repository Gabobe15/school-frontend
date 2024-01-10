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
    <html>
      {/* <CacheProvider value={emotionCache}> */}
        <body>
          <Provider store={store}>
            {/* <Sidebar/> */}
            <main>
              <Navbar/>
              {children}
            </main>
              <Footer/>
          </Provider>
        </body>
      </html>
  );
};

export default Layout;
