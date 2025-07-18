import { z } from "zod";

const signInSchema = z.object({
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символа"),
}); 

const signUpSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символа"),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

type SignInSchemaType = z.infer<typeof signInSchema>;

export { signInSchema, type SignInSchemaType, signUpSchema, type SignUpSchemaType };
