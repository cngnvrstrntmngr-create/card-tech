import GoogleProvider from "next-auth/providers/google";
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
      if (account?.provider === "google" && profile?.email) {
        const users = await getUsers();

        const dbUser = users.find((u) => u.mail === profile.email);

        token.role = dbUser?.role ?? "OBSERVER";
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
