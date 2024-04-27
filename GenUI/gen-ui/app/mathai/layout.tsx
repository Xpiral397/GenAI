import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "../providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import Sidebar from "@/components/sidebar";
import { ScrollShadow } from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1  flex space-x-3 space-y-1">
      <div className="md:hidden hidden ">
        <Sidebar />
      </div>

      <main className="w-full  overflow-y-scroll">{children}</main>
    </div>
  );
}
