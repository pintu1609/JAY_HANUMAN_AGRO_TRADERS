"use client";
import SellerGoodsDetailsComp from "@/compoment/seller/SellerGodsDetailsComp";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SellersGoodsDetails() {
        const router = useRouter();
    
 const currentYear = new Date().getFullYear();

    const [currentYearAdd, setCurrentYearAdd] = useState(currentYear);
        const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);
 const handleClickYear = (year: number) => {
        setCurrentYearAdd(year);
    };

    return <div className="p-6 bg-orange-50 min-h-screen ">
        <div  className="grid grid-cols-3 items-center mb-6">
            <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
            <h1 className="text-3xl mb-3 text-center font-bold text-orange-600 underline underline-offset-8">Seller Goods Managemnt</h1>
        </div>

        <div className="overflow-x-auto pb-2">
                    <div className="flex gap-3 whitespace-nowrap">
                        {years.map((year) => (
                            <div
                                key={year}
                                onClick={() => handleClickYear(year)}
                                className={`px-4 py-2 rounded-lg font-medium cursor-pointer
          ${currentYearAdd === year
                                        ? "bg-orange-600 text-white"   // selected year styling
                                        : "bg-orange-100 text-orange-800 hover:bg-orange-200"} // default styling
        `}>
                                {year}
                            </div>
                        ))}
                    </div>
                </div>
        
        <SellerGoodsDetailsComp currentYear={currentYearAdd}/>
    </div>;
}