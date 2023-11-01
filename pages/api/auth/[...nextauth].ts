import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbUsers } from 'fleed/db';
// import { dbUsers } from '@/database';



export default NextAuth({
  // Configure one or more authentication providers
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       
      // redirect_uri :' http://127.0.0.1:3000/api/auth/callback/google'
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'password:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
       
        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password ) as any;
       
      },
      
      

    }),
    
   
  ], 
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // cada día
  },
  callbacks: {

    async jwt({ token, account, user,profile }) {

      if ( account ) {
 
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'oauth': 
                token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '', user?.image  || '');
          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },


    async session({ session, token, user }){
      // ({ session, token, user });

      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    }
  }

});