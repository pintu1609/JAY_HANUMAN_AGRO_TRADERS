"use client";
import { useState } from "react";
import Navbar from "@/compoment/navbar/Navbar";
import Sidebar from "@/compoment/sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={open} />

      <div className="flex-1">
        <Navbar toggleSidebar={() => setOpen(!open)} />
        <main className="bg-[#FFF6E9]">
          {children}
        </main>
      </div>
    </div>
  );
}
