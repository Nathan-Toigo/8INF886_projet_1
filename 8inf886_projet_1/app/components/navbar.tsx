"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
} from "@heroui/react";
import "./logoutButton";
import LogoutButton from "./logoutButton";
import { getUserName } from "@/lib/session";

export const Logo = () => {
  return (
    <img
      src="/logo_bright.png"
      alt="Logo"
      className="w-42 h-auto"
    />
  );
};


export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [username, setUsername] = useState<string | null>(null);


  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUserName();
      setUsername(name);
    };
    fetchUsername();
  }, []);

  const menuItems = [
    "Chat",
    "Settings",
    "Logs",
    "Log Out",
  ];

  const getItemHref = (item: string) => {
    if (item === "Chat") return "/chat";
    if (item === "Settings") return "/settings";
    if (item === "Logs") return "/logs";
    return "#";
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand as={Link} href="/home">
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand as={Link} href="/home">
          <Logo />
        </NavbarBrand>
        {menuItems.slice(0, -1).map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              href={getItemHref(item)}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <div className="hidden sm:flex items-center gap-2">

          <p className="text-sm"> Connecté en tant que 
            <p className="text-center" style={{ color: '#FFFF00' }}>
              {username}
            </p>
          </p>
        </div>
        {menuItems.slice(-1).map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>{
            <LogoutButton />
          }
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.slice(0, -1).map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={getItemHref(item)}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

