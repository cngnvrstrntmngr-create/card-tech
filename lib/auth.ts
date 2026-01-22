import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { getUsers } from "@/app/actions/users/user-action";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ===== Google =====
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ===== Secret word =====
    CredentialsProvider({
      name: "Secret Login",
      credentials: {
        secret: {
          label: "Secret word",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.secret) return null;

        if (credentials.secret !== process.env.SECRET_LOGIN_WORD) {
          return null;
        }

        /**
         * ВАЖНО:
         * next-auth требует вернуть user-объект
         * Даже если пользователя нет в БД
         */
        return {
          id: "secret-user",
          name: "Secret User",
          email: "secret@login.local",
          role: "CUCINA",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },

  debug: true,

  callbacks: {
    async jwt({ token, account, profile, user }) {
      /**
       * Google login
       */
      if (account?.provider === "google" && profile?.email) {
        const users = await getUsers();
        console.log("users", users);
        const dbUser = users.find((u) => u.mail === profile.email);

        token.role = dbUser?.role ?? "OBSERVER";
      }

      /**
       * Secret login
       */
      if (account?.provider === "credentials" && user) {
        token.role = (user as any).role ?? "ADMIN";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "OBSERVER";
      }
      return session;
    },
  },
};
