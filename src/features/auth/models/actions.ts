import bcrypt from "bcryptjs";
import { executeAction } from "./executeAction";
import { signUpSchema } from "../lib/schema";
import db from "@/shared/prisma/db";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const signUp = async (data: SignUpData) => {
  return executeAction({
    actionFn: async () => {
      const validatedData = signUpSchema.parse(data);

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);

      const existingUser = await db.user.findUnique({
        where: { email: validatedData.email.toLowerCase() },
      });

      if (existingUser)
        throw new Error("Пользователь с таким email уже существует");

      await db.user.create({
        data: {
          name: validatedData.name,
          email: validatedData.email.toLowerCase(),
          password: hashedPassword,
        },
      });
    },
    successMessage: "Успешная регистрация",
  });
};

export { signUp };
