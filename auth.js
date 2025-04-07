import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { Registration } from "./model/registration";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./service/dbConnect";
export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials == null) return null;
        try {
          await dbConnect();
          const user = await Registration.findOne({
            email: credentials?.email,
          });
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Check your password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err) {
          console.error(err);
          throw new Error(err);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user._id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
