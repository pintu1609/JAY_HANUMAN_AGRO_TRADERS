"use client";
import {
  Users,
  Briefcase,
  Warehouse,
  Building,
  Package,
  Boxes,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCookies } from "next-client-cookies";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
  { title: "Sellers Goods", icon: Package, url: "/dashboard/sellersgoodsdetails" },
  { title: "Client Goods", icon: Boxes, url: "/dashboard/clientsgoodsdetails" },
  { title: "Clients", icon: Users, url: "/dashboard/clientdetails" },
  { title: "Company", icon: Building, url: "/dashboard/companydetails" },
  { title: "Warehouse", icon: Warehouse, url: "/dashboard/warehousedetails" },
  { title: "Brokers", icon: Briefcase, url: "/dashboard/brokerdetails" },
  { title: "Users", icon: Users, url: "/dashboard/user" },
];

export default function Sidebar({ open }: { open: boolean }) {
  const cookies = useCookies();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    cookies.remove("accessToken");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen sticky top-0 flex flex-col transition-all ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* MENU */}
      <div className="p-4 space-y-2 flex-1">
        {menu.map((item, i) => {
          const isActive = pathname === item.url;

          return (
            <div
              key={i}
              onClick={() => router.push(item.url)}
              className={`group relative flex items-center gap-3 cursor-pointer p-2 rounded-md transition-colors
                ${
                  isActive
                    ? "bg-gray-800 text-orange-400 border-l-4 border-orange-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <item.icon className="w-5 h-5" />

              {/* Normal label when sidebar open */}
              {open && (
                <span className="text-sm font-medium">{item.title}</span>
              )}

              {/* Tooltip when sidebar closed */}
              {!open && (
                <span
                  className="
                    absolute left-[-14px] bottom-[-100%] -translate-y-1/2
                    bg-black text-white text-xs font-medium
                    px-3 py-1 rounded-md
                    opacity-0 group-hover:opacity-100
                    pointer-events-none
                    whitespace-nowrap
                    shadow-lg
                    z-80
                  "
                >
                  {item.title}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-gray-800">
        <div
          onClick={handleLogout}
          className="group relative flex items-center gap-3 cursor-pointer p-2 rounded-md text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          <LogOut className="w-5 h-5" />

          {open && <span className="text-sm font-medium">Logout</span>}

          {!open && (
            <span
              className="
                absolute left-[-14px] top-[-100%] -translate-y-1/2
                bg-black text-white text-xs font-medium
                px-3 py-1 rounded-md
                opacity-0 group-hover:opacity-100
                pointer-events-none
                whitespace-nowrap
                shadow-lg
              "
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
