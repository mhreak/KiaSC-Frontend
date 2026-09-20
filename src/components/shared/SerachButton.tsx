import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <Button
      variant="outline"
      className="absolute left-0.5 top-1/2 size-6 -translate-y-1/2 bg-secondary text-secondary-foreground cursor-pointer rounded-full p-5"
    >
      <Search className="size-5" />
    </Button>
  );
};

export default SearchButton;
