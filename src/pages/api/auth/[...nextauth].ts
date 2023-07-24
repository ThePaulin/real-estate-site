import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { verifyPassword } from "../../../utils/auth";
import type { AuthOptions } from "next-auth";
import clientPromise from "@/utils/mongodb";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    collections: { Users: "cribs-kgl-users" },
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      
      // @ts-expect-error description: credential type is different
      async authorize(credentials: { email: string; password: string }) {
        // const client = await connectToDatabase();
        const client = await clientPromise;

        if (client !== null) {
          const db = client.db();

          const user = await db
            .collection("cribs-kgl-users")
            .findOne({ email: credentials.email });
          if (user === null) {
            // client.close();
            throw new Error("No user found!");
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            // client.close();
            throw new Error("Could not log you in!");
          }

          // client.close();
          return {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            savedItems: user.savedItems,
          };
        } else {
          return { ok: false };
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user, profile, trigger, session }) {
      // Persist the OAuth access_token to the token right after signin
      if (account != null) {
        token.accessToken = account.access_token;
        token.user = user;
      }

      if (trigger === "update") {
        // token.user.savedItems = session.savedItems
        return { ...token, ...session };
      }
      return { ...token, ...user };
    },

    async session({ session, token, user, trigger }) {
      // Send properties to the client, like an access_token from a provider.
      
      // @ts-expect-error description accessToken to be added to session type
      session.accessToken = token.accessToken;
      // @ts-expect-error description user to be added to session type
      session.user = token.user;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
