"use client"
import { useGetWareHouseGoods } from "@/hook/warehouse"
import { WareHouseDetailsParams } from "@/types/warehouse/warehouse"
import { ClipLoader } from "react-spinners"
import { FiEye } from "react-icons/fi"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function WareHouseDetails() {
    const router = useRouter();
    const currentYear = new Date().getFullYear();

    const [currentYearAdd, setCurrentYearAdd] = useState(currentYear);
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);


    const { data: queryResult, isLoading } = useGetWareHouseGoods(currentYearAdd)

    const warehouseDetails: WareHouseDetailsParams[] = queryResult?.data || []

    const handleShowPackageDetails = (item: WareHouseDetailsParams) => {
        console.log("Show packages for:", item)
    }

    const handleClickYear = (year: number) => {
        setCurrentYearAdd(year);
    };

    return (
        <div className="p-6 bg-orange-50 min-h-screen">
            <div className="grid grid-cols-3 items-center mb-6 cursor-pointer">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-3xl font-bold text-orange-700 text-center underline underline-offset-8">Warehouse Management</h1>


            </div>

            <div className="overflow-x-auto pb-4">
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


            {isLoading ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <ClipLoader size={100} color="#36d7b7" />
                </div>
            ) : warehouseDetails.length > 0 ? (
                <div className=" flex justify-center overflow-x-auto">
                    <table className="w-3/4 border border-gray-300 rounded-2xl overflow-hidden">
                        <thead>
                            <tr className="bg-orange-100 text-orange-900 text-sm">
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Address</th>
                                <th className="p-3 border">Package</th>
                                <th className="p-3 border">Weight</th>
                                <th className="p-3 border">Rate</th>
                                <th className="p-3 border">Comm. Rate</th>
                                <th className="p-3 border">Ttl. Amt</th>
                                <th className="p-3 border"> Ttl Comm.</th>

                                {/* <th className="p-3 border-l border-t">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseDetails.map((item, index) => {
                                const totalPackage = item.packages.reduce((total, pkg) => total + Number(pkg.package), 0)
                                const totalAmt = item.packages.reduce((total, pkg) => total + Number(pkg.amount), 0)
                                const totalComm = (item.packages.reduce((total, pkg) => total + Number(pkg.amount) * Number(pkg.commision) / 100, 0))

                                return (
                                    <tr key={index} className="hover:bg-orange-50 text-sm">
                                        <td className="p-2 border text-center">{item.sellerName || "-"}</td>
                                        <td className="p-2 border text-center">{item.sellerAddress || "-"}</td>
                                        <td className="p-2 border text-center ">
                                            {item.packages.map((pkg, i) => (
                                                <div key={i} className="flex flex-col">
                                                    {pkg.package}
                                                </div>
                                            ))}
                                        </td>

                                        <td className="p-2 border text-center">
                                            {item.packages.map((pkg, i) => (
                                                <div key={i} className="flex flex-col">
                                                    {pkg.weight}</div>
                                            ))}
                                        </td>   
                                                                                <td className="p-2 border text-center">
                                            {item.packages.map((pkg, i) => (
                                                <div key={i} className="flex flex-col">
                                                    ₹{pkg.rate}</div>
                                            ))}
                                        </td>     
 <td className="p-2 border text-center">
                                            {item.packages.map((pkg, i) => (
                                                <div key={i} className="flex flex-col">
                                                    ₹{pkg.commision}</div>
                                            ))}
                                        </td>                               
                                                      <td className="p-2 border text-center">{totalAmt.toFixed(2)}</td>
                                        <td className="p-2 border text-center">{totalComm.toFixed(2)}</td>
                                        {/* <td className="p-2 border-l border-t text-center">
                                            <button
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                onClick={() => handleShowPackageDetails(item)}
                                            >
                                                <FiEye size={18} className="text-gray-500" />
                                            </button>
                                        </td> */}
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-orange-100 text-orange-900 font-semibold text-sm">
                                <td colSpan={2} className="p-2 border text-center">Total</td>
                                <td className="p-2 border text-center">
                                    {warehouseDetails.reduce(
                                        (sum, item) => sum + item.packages.reduce((t, pkg) => t + Number(pkg.package), 0),
                                        0
                                    )}
                                </td>
                                <td colSpan={2} className="p-2 border text-center">-</td>
                                <td className="p-2 border text-center">
                                    ₹
                                    {warehouseDetails
                                        .reduce((sum, item) => sum + item.packages.reduce((t, pkg) => t + Number(pkg.amount), 0), 0)
                                        .toFixed(2)}
                                </td>
                                <td className="p-2 border text-center">
                                    ₹
                                    {warehouseDetails
                                        .reduce((sum, item) => sum + item.packages.reduce((t, pkg) => t + Number(pkg.commision), 0), 0)
                                        .toFixed(2)}
                                </td>
                                <td className="p-2 border-l border-t border-b" ></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="flex justify-center items-center h-[50vh]">
                    <p className="text-2xl font-bold text-gray-600">No WareHouse Details found for {currentYearAdd}</p>
                </div>
            )}
        </div>
    )
}
