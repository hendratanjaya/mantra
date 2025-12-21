"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiMagicHat } from "react-icons/gi";

const NavLinks = () => {
  const pathName = usePathname();
  const links = [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <div className="space-x-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${pathName === link.href && "underline"}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export function AuthHeader() {
  return (
    <div className="flex h-full justify-between items-center px-4 py-6">
      <div className="flex items-center gap-x-2">
        {/* <Avatar>
          <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
        </Avatar> */}
        <GiMagicHat className="size-5" />
        <h3 className="font-semibold">Mantra</h3>
      </div>
      <NavLinks />
    </div>
  );
}
