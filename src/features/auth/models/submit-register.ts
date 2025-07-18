"use server";

import { SignUpSchemaType } from "../lib/schema";
import { signUp } from "./actions";

const onSubmit = async (data: SignUpSchemaType): Promise<any> => {
  const res = await signUp(data);
  if (res.success) {
    return {
      ...res,
      shouldRedirect: res.success,
    };
  }
};

export { onSubmit };
