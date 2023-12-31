import NextAuth from "next-auth/next";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticate } from '@/mocks/authenticate';

import type {User} from 'next-auth'

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    name: 'email',
                    label: "email",
                    type: "email",
                    placeholder: "Email"
                },
                password: { 
                    name: 'password', label: "password", 
                    type: "password", placeholder: "Password" 
                }

            },
            
            async authorize(
              credentials: Record<"email" | "password", string> | undefined,
              req: any
            ): Promise<User | null>  {
                if (typeof credentials !== "undefined") {
                    const res:any = await authenticate({
                      email: credentials.email,
                      password: credentials.password,
                    });
          
                    if (typeof res !== "undefined") {
                      if (res.error === "invalid_password") {
                        throw new Error("Invalid password");
                      } else if (res.error === "invalid_user") {
                        throw new Error("Invalid user");
                      } else {
                        return  {...res} ;
                      }
                    } else {
                      throw new Error("Unknown error");
                    }
                  } else {
                    throw new Error("Missing credentials");
                  }
            },
            
        })
    ],

    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, user, account }:any) {
            if(user && account){
                return {...token, ...user};            
            };
            return token
        },
        async session({ session, token }) {
            
            session.user = token;
            return session;
        }
    },
        pages: {
        signIn: '/login', 
        signOut:'/login'
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };