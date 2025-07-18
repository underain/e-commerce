import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/schema";
import db from "@/shared/prisma/db";

const adapter = PrismaAdapter(db) as any;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = signInSchema.parse(credentials);

        const user = await db.user.findUnique({
          where: { email: validatedCredentials.email },
          select: {
            id: true,
            name: true,
            email: true,
            password: true,
            role: true,
          },
        });

        if (!user?.password) {
          throw new Error("Пользователь не найден");
        }

        const isValidPassword = await bcrypt.compare(
          validatedCredentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Неправильный логин или пароль");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("В токене не найден идентификатор пользователя");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Не удалось создать сессию");
        }

        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
});
