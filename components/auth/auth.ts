import { AccountData, TierObject } from "@/types/app.types";
import NextAuth, { type DefaultSession } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import authConfig from '@/auth.config';
import DatabaseHelper from '@/main/mysql2/helper/DatabaseHelper';

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User & AdapterUser
    tier?: TierObject
  }
  interface User extends AccountData { }
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  ...authConfig,

  providers: [
    Credentials(
      {
        credentials: {
          email: {},//{ label: "Email", type: "text", placeholder: "Enter Email" },
          password: {}//{ label: "Password", type: "password" }
        },

        async authorize(credentials, request) {
          try {
            if (!credentials)
              return null;

            if (typeof credentials.password !== "string")
              return null;

            if (typeof credentials.email !== "string")
              return null;

            if (typeof credentials.password !== "string")
              return null;

            const user = await DatabaseHelper.getAccountByEmail(credentials.email);
            // user not found
            if (!user) {
              console.error("User not found");
              return null;
            }
            // user found, check if the password matches the hash
            const
              match = await ValidatePassword(credentials.password, user.hash);
            // if the password did not match, return null else return the user
            return !match
              ? null
              : { ...user };
          }
          catch (e) {
            console.error("error from auth", e);
            return null;
          }
        },
      }
    )
  ],

  callbacks: {
    /**
     * Generates a JWT token based on the trigger and user.
     */
    async jwt({ token, user, /*account, profile,*/ trigger/*, session*/ }) {
      return trigger === "signIn" && user ? { ...token, ...user } : token;
    },

    /**
     * Returns the session with the user data.
     */
    async session({ session, token }) {
      const tier = await DatabaseHelper.getTierById(token.tier as number);
      return { ...session, user: { ...session.user, ...token }, tier: tier }
    },
  },
});

/**
 * Validates a password by comparing it with a hash using bcrypt.
 * 
 * @param password - The password to validate.
 * @param hash - The hash to compare the password against.
 * @returns A promise that resolves to a boolean indicating whether the password is valid.
 */
async function ValidatePassword(password: string, hash: string) {
  const
    bcrypt = await import("bcrypt"),
    isValid = await bcrypt.compare(password, hash);
  return isValid;
};
