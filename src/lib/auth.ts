import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/sign-in",
    newUser: "/admin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const exisitingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!exisitingUser) {
          return null;
        }
        const passwordmatch = await compare(
          credentials.password,
          exisitingUser.password
        );
        if (!passwordmatch) {
          return null;
        } else {
          return {
            id: `${exisitingUser?.id}`,
            username: exisitingUser?.username,
            email: exisitingUser?.email,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
};
