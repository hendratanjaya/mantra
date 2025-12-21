"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { RiAccountPinBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { LogoutButton } from "./logout-button";
import { useContext, useEffect, useState } from "react";
import { UserProviderContext } from "../_providers/user-provider";
import { avatarImageList } from "../_constants";
import Link from "next/link";

export function FooterSidebar({}) {
  const { isMobile } = useSidebar();
  const { user: userContext } = useContext(UserProviderContext)!;
  const avatartFallback = userContext?.name.slice(0, 2).toUpperCase() || "404";

  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    const idx = Math.floor(Math.random() * avatarImageList.length);
    setAvatarImage(avatarImageList[idx]);
  }, []);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={userContext?.avatar || avatarImage || undefined}
                  alt={"https://github.com/shadcn.png"}
                />
                <AvatarFallback className="rounded-lg">
                  {avatartFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-muted-foreground truncate text-xs">
                  {userContext?.username || "unknown_user_404"}
                </span>
              </div>
              <HiDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={userContext?.avatar || avatarImage || undefined}
                    alt={"https://github.com/shadcn.png"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {avatartFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {userContext?.name || "unknown_user_404"}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userContext?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <RiAccountPinBoxLine />
                <Link href={"/setting"}>Account Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RiLogoutBoxRLine />
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
