"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Lock, User2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      UserName: "",
      Password: "",
    },
  });

  const handleSubmitForm = async (data: LoginFormValues) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="size-full">
      <div className="bg-background flex-center h-full">
        <div className="shadow-lg w-5xl h-140 mx-auto rounded-xl flex flex-row border border-border/30">
          <div
            className={cn(
              "bg-cover bg-center bg-no-repeat w-1/3 rounded-r-xl text-white p-2",
              "flex flex-col justify-center items-center gap-5",
            )}
            style={{
              backgroundImage: `url("/login-bg-1.jpg")`,
            }}
          >
            <h2 className="text-2xl">ایجاد حساب کاربری</h2>
            <p className="text-center">
              به سادگی در سایت ثبت نام کرده و حساب کاربری خود را فعال کنید
            </p>
            <button className="rounded-full border border-white p-2 px-9 hover:bg-white hover:text-black cursor-pointer transition-all duration-400 active:translate-y-1 ease-out">
              ثبت نام
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-5">
            <h2 className="text-3xl text-text">ورود به حساب کاربری</h2>
            <p className="text-center text-text">
              از نام کاربری و رمز عبور برای ورود به حساب کاربری خود استفاده کنید
            </p>
            <div className="relative w-xs">
              <Input
                {...register("UserName")}
                type="text"
                placeholder="نام کاربری (کد ملی)"
                className={cn(
                  "p-2 pr-10 border-t-0 border-r-0 border-l-0 rounded-none  focus-visible:ring-0 border-text focus-visible:border-b-primary transition-all duration-200",
                  errors.UserName &&
                    "border-b-destructive focus-visible:border-b-2 focus-visible:border-b-destructive",
                )}
              />
              <User2 className="absolute bottom-4 right-0 size-6 text-primary" />
            </div>
            {errors.UserName && (
              <span className="text-sm text-destructive animate-shake">
                {errors.UserName.message}
              </span>
            )}
            <div className="relative w-xs">
              <Input
                {...register("Password")}
                type="Password"
                placeholder="کلمه عبور"
                className={cn(
                  "p-2 pr-10 border-t-0 border-r-0 border-l-0 rounded-none  focus-visible:ring-0 border-text focus-visible:border-b-primary transition-all duration-200",
                  errors.Password &&
                    "border-b-destructive focus-visible:border-b-2 focus-visible:border-b-destructive",
                )}
              />
              <Lock className="absolute bottom-4 right-0 size-6 text-primary" />
            </div>
            {errors.Password && (
              <span className="text-sm text-destructive animate-shake ">
                {errors.Password.message}
              </span>
            )}
            <Button variant={"link"}>فراموشی رمز عبور</Button>
            <button
              type="submit"
              className="rounded-full text-text border border-primary p-2 px-9 hover:bg-primary hover:text-white cursor-pointer transition-all duration-400 active:translate-y-1 ease-out"
            >
              {isLoading ? "در حال ورود..." : "ورود"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
