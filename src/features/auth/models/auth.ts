import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/schema";
import db from "@/shared/prisma/db";

const adapter = PrismaAdapter(db as any);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = signInSchema.parse(credentials);

        const user = await db.user.findUnique({
          where: { email },
          select: {
            id: true,
            password: true,
          },
        });

        if (!user?.password) {
          throw new Error("Пользователь не найден");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Неправильный логин или пароль");
        }

        return { id: user.id };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
