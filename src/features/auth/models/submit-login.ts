"use server";
import { signIn } from "./auth";
import { SignInSchemaType } from "../lib/schema";
import { executeAction } from "./executeAction";

const onSubmit = async (data: SignInSchemaType): Promise<void> => {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", data);
    },
  });
};

export { onSubmit };
