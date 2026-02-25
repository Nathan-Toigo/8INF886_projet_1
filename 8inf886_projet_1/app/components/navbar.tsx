"use client";

import React from "react";
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

export const Logo = () => {
  return (
    <img
      src="/logo_bright.png"
      alt="Logo"
      className="w-42 h-auto"
    />
  );
};

const handleLogout = async () => {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    window.location.href = "/";
  }
};

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Chat",
    "Settings",
    "Log Out",
  ];

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
              href={
                item === "Chat" ? "/chat"
                  : item === "Settings" ? "/settings"
                    : "#"}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
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
              href={
                item === "Chat" ? "/chat"
                  : item === "Settings" ? "/settings"
                    : "#"}
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

