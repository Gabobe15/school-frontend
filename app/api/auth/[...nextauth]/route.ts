
// "use client";
import NextAuth, {NextAuthOptions, getServerSession} from "next-auth";
// import { getServerSession,type NextAuthOptions} from "next-auth";
// import Credentials from "node_modules/next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
// import { userService } from "./userService";

// ** Next Import
import { useRouter, usePathname } from 'next/navigation'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from '../../../configs/auth'

export type ErrCallbackType = (err: { [key: string]: string | any }) => void

const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt", //(1)
    },
    pages: {
        signIn: '/LoginTest', //(4) custom signin page path
    },
    providers: [
        CredentialsProvider({
          name: "credentials",
          credentials: {
            email: {},
            password: {}
          },
          // async authorize(credentials, req) {
          // authorize: async (credentials, req, errorCallback?: ErrCallbackType) => {
            // const { email, password } = credentials as {
            //   email: string
            //   password: string
            // };

          //   axios
          //   .post(authConfig.loginEndpoint, {email, password})
          //   .then(async res => {
          //     console.log(res.data.user)
          //     return Promise.resolve(res.data.user);
          //   })
          //   .catch(err => {
          //     console.error('Authentication failed', err);
          //   })

          //   return Promise.resolve(null);
          // }

          async authorize(credentials, req) {
            const { email, password } = credentials as {
              email: string
              password: string
            };
            return axios
              .post(authConfig.loginEndpoint, {email, password})
              .then(async response => {
                return response.data.user;
              })
              .catch((error) => {
                console.log(error.response);
                throw new Error(error.response.data.message);
              }) || null;
          },
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
      callbacks: {
        async jwt({ token, user }) { 
          if(user) { 
            token.email = user.email; 
            // token.first_name = user?.first_name; 
          }
          console.log("this is the token ", token)
          return token;
        },
        async session({ session, token }) { 
          if(token){
            session.user.email = token.email; 
          }
          console.log("this is the token ", token)
          return session;
        },
      },
  };

  const handler = NextAuth(authOptions)
  
export { handler as GET, handler as POST }


// https://americanhighschoolacademy.com/