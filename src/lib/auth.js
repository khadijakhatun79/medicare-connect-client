import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt, admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("medicareconnect");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        default: "patient",
      },
      verificationStatus: {
        type: "string",
        default: "pending",
      },
      photo: {
        type: "string",
      },
    },
  },

  plugins: [jwt(), admin()],
});