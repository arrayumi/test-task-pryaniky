import { z } from "zod";

const login = z
  .object({
    username: z.string().min(1),
    password: z
      .string()
      .min(8, "Password length must be from 8 to 40 symbols")
      .max(40, "Password length must be from 8 to 40 symbols"),
  })
  .required();

export const schemas = {
  login: login,
};
