import React from 'react';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions ={
  providers:[
    GoogleProvider({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl:'http://localhost:3000/api/auth/callback/google'
    })
  ]
}

export default NextAuth(authOptions);