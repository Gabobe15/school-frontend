// "use client";

// // ** React Imports
// import { useEffect } from 'react'

// // ** Next Imports
// import { useRouter } from 'next/navigation'

// // ** Spinner Import
// // import Spinner from 'src/@core/components/spinner'
// import CircularProgress from '@mui/material/CircularProgress';

// import { getServerAuthSession } from "./core/services/auth";

// async function Home() {
//   // ** Hooks
//   const router = useRouter()
//   const authSession = await getServerAuthSession();

//     if (authSession?.user) {
//       // Redirect user to Home URL
//       router.replace('/dashboard')
//     }

//   return <CircularProgress />
// }

// export default Home
'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import scss from './Layout.module.scss';
import LoginPage from './users/login/LoginForm';
import Dashboard from './pages/dashboard/dashboard';

const Home: React.FC = () => {
  const { data: session } = useSession();
  return (
    <main className={scss.main}>
      {session && <Dashboard />}
      {!session && <LoginPage />}
    </main>
  );
};

export default Home;
