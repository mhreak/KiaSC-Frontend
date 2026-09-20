import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";

const ProfileAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon-lg"
            className="rounded-full bg-secondary flex-center p-3 cursor-pointer size-12"
          >
            <User2 className="text-secondary-foreground size-6" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            <p className="text-lg">{"mhreak"}</p>
            <Button size={"icon"} variant={"secondary"}>
              <User2 className="text-secondary-foreground size-4" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className={"text-destructive flex justify-between"}>
            خروج از حساب کاربری
            <Button size={"icon"} variant={"destructive"}>
              <LogOut className="size-4" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
