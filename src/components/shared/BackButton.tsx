import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { useTransitionRouter } from "next-view-transitions";

const BackButton = () => {
  const router = useTransitionRouter();
  return (
    <Button
      variant={"outline"}
      size={"icon-lg"}
      onClick={() => {
        router.back();
      }}
    >
      <ArrowRight />
    </Button>
  );
};

export default BackButton;
