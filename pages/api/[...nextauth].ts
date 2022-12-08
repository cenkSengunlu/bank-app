import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useAppSelector } from "../../app/hooks";
import {
  selectIsLoggedIn,
  selectLoggedInUser,
} from "../../slices/login/loginSlice";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const isLoggedIn = useAppSelector(selectIsLoggedIn);
        const user = useAppSelector(selectLoggedInUser);
        console.log("isLoggedIn", isLoggedIn);
        // perform you login logic
        // find out user from db
        if (username !== "admin" || password !== "admin") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};

export default NextAuth(authOptions);
