// "use client";
// import React from "react";
// import {
//   Users,
//   Briefcase,
//   Warehouse,
//   Building,
//   Package,
//   Boxes,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// const Dashboard = () => {
//   const router = useRouter();
//   const cards = [
//     {
//       title: "Sellers Goods",
//       count: 120,
//       icon: <Package className="w-10 h-10 text-blue-600" />,
//       bg: "bg-blue-100",
//       url: "/dashboard/sellersgoodsdetails",
//     },
//     {
//       title: "Client Goods",
//       count: 120,
//       icon: <Boxes className="w-10 h-10 text-indigo-600" />,
//       bg: "bg-indigo-100",
//       url: "/dashboard/clientsgoodsdetails",
//     },
//     {
//       title: "Clients Details",
//       count: 85,
//       icon: <Users className="w-10 h-10 text-green-600" />,
//       bg: "bg-green-100",
//       url: "/dashboard/clientdetails",
//     },
//     {
//       title: "Company Details",
//       count: 42,
//       icon: <Building className="w-10 h-10 text-purple-600" />,
//       bg: "bg-purple-100",
//       url: "/dashboard/companydetails",
//     },
//     {
//       title: "WareHouse Details",
//       count: 42,
//       icon: <Warehouse className="w-10 h-10 text-yellow-600" />,
//       bg: "bg-yellow-100",
//       url: "/dashboard/warehousedetails",
//     },
//     {
//       title: "Brokers",
//       count: 42,
//       icon: <Briefcase className="w-10 h-10 text-red-600" />,
//       bg: "bg-red-100",
//       url: "/dashboard/brokerdetails",
//     },
//     {
//       title: "Users",
//       count: 250,
//       icon: <Users className="w-10 h-10 text-pink-600" />,
//       bg: "bg-pink-100",
//       url: "/dashboard/user",
//     },
//   ];

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className={`cursor-pointer rounded-2xl shadow-md p-6 flex items-center gap-4 transition-transform transform hover:scale-105 ${card.bg}`}
//           onClick={() => {
//             router.push(card.url);
//           }}
//         >
//           <div className="p-3 rounded-full bg-white shadow">{card.icon}</div>
//           <div>
//             <h2 className="text-lg font-semibold">{card.title}</h2>
//             <p className="text-2xl font-bold">{card.count}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Dashboard;

"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 200 },
];

export default function Dashboard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Goods Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
