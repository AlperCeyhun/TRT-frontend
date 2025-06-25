"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, CircleUser } from "lucide-react";

const AccountButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("username");
  if (storedUser) {
      setUsername(storedUser);
  } else {
      setUsername(null);
  }}, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  };

  if (pathname === "/login" || pathname === "/register") return null;
  if (!username) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize">
          <CircleUser/>
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-2">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
        >
          <LogOut/>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountButton;