"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTransitionRouter } from "next-view-transitions";

const BackButton = () => {
  const router = useTransitionRouter();
  return (
    <Button
      variant={"info"}
      onClick={() => {
        router.back();
      }}
    >
      <ArrowRight />
      بازگشت
    </Button>
  );
};

export default BackButton;
