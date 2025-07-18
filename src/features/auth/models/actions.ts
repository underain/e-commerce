import bcrypt from "bcryptjs";
import db from "@/shared/prisma/db";
import { executeAction } from "./executeAction";
import { signUpSchema } from "../lib/schema";

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
