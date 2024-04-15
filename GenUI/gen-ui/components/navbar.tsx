"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import {
  ArtTrack,
  Close,
  FastForward,
  FormatListBulleted,
  Home,
  HomeOutlined,
  ListAlt,
  MapsHomeWorkTwoTone,
  RunCircle,
  Science,
  StoreMallDirectory,
} from "@mui/icons-material";
import { useState } from "react";
import { ListItem, ListItemAvatar } from "@mui/material";

export const Navbar = () => {
  const [navbar, setNavbar] = useState<boolean>(false);
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <div className="bg-blue-600  h-14 items-center  flex justify-center sm:justify-around sm:flex-row flex-col w-full text-white ">
      <div className="h-full w-full  flex-row-reverse flex items-center text-2xl md:text-2xl font-[700] ">
        <span className="justify-around w-full h-full flex items-center bg-clip-text text-transparent bg-gradient-to-r from-slate-50  via-orange-300  to-yellow-300">
          <h1 className="mt-1 ">X-Gen AI</h1>
          <h1 className="text-white" onClick={() => setNavbar(!navbar)}>
            <FormatListBulleted color="inherit" />
          </h1>
        </span>
      </div>
      {navbar && (
        <div className="relative shadow-2xl w-full h-full py-4  ">
          <div className="sm:hidden z-10 absolute top-0 -mt-10 right-0 rounded-lg py-4  bg-white items-center justify-center shadow-2xl flex flex-col h-[200px] w-full">
            <div className="shadow-md flex items-center text-2xl md:text-2xl font-[700] w-full p-3 ">
              <div
                className="z-10    w-full h-full "
                onClick={() => setNavbar(!navbar)}
              >
                <Close color="secondary" />
              </div>
              <span className=" whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-teal-700  via-orange-300  to-yellow-300">
                X-Gen AI
              </span>
            </div>

            {navbar && (
              <ul
                className="mt-5 space-y-5 text-[16px] font-y
            semibold  text-lrft px-2  text-secondary-500 flex flex-col justify-center  w-full"
              >
                <li className="flex space-x-2">
                  <Home />
                  <h1>Story AI</h1>
                </li>
                <li className="flex space-x-2 ">
                  <Science /> <h1>XMath AI</h1>
                </li>
                <li className="flex space-x-2 ">
                  <RunCircle />
                  <h1>XSmart AI</h1>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}{" "}
    </div>
  );
};
