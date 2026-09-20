"use client";

import { NumberTicker } from "@/components/shadcn-space/number-ticker/number-ticker-03";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function OtpPage() {
  const [value, setValue] = useState("");
  const [sec, setSec] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col justify-center items-center gap-14">
      <div className="flex flex-col items-center justify-center gap-5 mt-30">
        <Image
          src="/images/bodokado-logo.png"
          width={50}
          height={50}
          alt="bodokado-logo"
        />
        <h3 className="font-semibold text-lg">کد ارسال شد</h3>
        <p className="text-muted-foreground text-center">{`ما کد را به شماره ${"09133162752"}  ارسال کرده ایم ،برای احراز هویت لطفا آن را وارد کنید :`}</p>
        <NumberTicker
          showHours={false}
          seconds={sec}
          className="text-xl flex gap-0"
          numberClassName="bg-transparent"
          seperatorClassName="text-text"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div dir="ltr">
          <InputOTP
            dir="ltr"
            maxLength={5}
            pattern={REGEXP_ONLY_DIGITS}
            value={value}
            onChange={(value) => setValue(value)}
            className="[&_input]:text-left [&_input]:direction-ltr input-otp"
            style={{ direction: "ltr" }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <span>
          کد را دریافت نکردید؟
          <button className="text-gradient mr-2 cursor-pointer active:translate-y-0.5 transition-default">
            ارسال دوباره
          </button>
        </span>
      </div>
      <div className="h-full w-full flex flex-col justify-end">
        <Button variant={"gradient"} type="submit" className={"mt-auto"}>
          ورود
        </Button>
      </div>
    </div>
  );
}
