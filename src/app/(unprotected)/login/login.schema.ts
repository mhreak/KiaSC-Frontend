import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "نام کاربری الزامی است")
    .max(100, "نام کاربری بیش از حد طولانی است"),

  password: z
    .string()
    .min(1, "رمز عبور الزامی است")
    .max(32, "رمز عبور حداکثر ۳۲ کاراکتر مجاز است"),
  // .regex(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
  // .regex(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
  // .regex(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
  // .regex(/[^A-Za-z0-9]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
