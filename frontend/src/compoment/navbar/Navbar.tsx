"use client";
import { Menu } from "lucide-react";

export default function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="h-12 bg-[#FFF6E9] sticky top-0 border-b flex items-center justify-between px-6 z-50">
      <button onClick={toggleSidebar}>
        <Menu className="w-6 h-6 text-orange-600" />
      </button>

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-orange-700">
          Pintu Kumar
        </span>
        <div className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center font-bold">
          PK
        </div>
      </div>
    </header>
  );
}
