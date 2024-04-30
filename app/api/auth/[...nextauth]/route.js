import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/DB/db.config";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      authorize: async (credentials) => {
        const user = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Password is incorrect");
        }
        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/admin-login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
