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

import React from 'react'

const Home = () => {
  return (
    <div>page</div>
  )
}

export default Home