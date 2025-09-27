"use client";
import ClientGoodsDetailsYearlyComp from "@/compoment/clientGoodDetails/ClientGoodsDetailsYearlyCom";
import { useGetAllClientDetailsById } from "@/hook/clientdetails";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function SellersGoodsDetails() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();

    const currentYear = new Date().getFullYear();

    const [currentYearAdd, setCurrentYearAdd] = useState(currentYear);
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);
    const handleClickYear = (year: number) => {
        setCurrentYearAdd(year);
    };
    const { data: clientData, isLoading } = useGetAllClientDetailsById(id)

    return <div className="p-6 bg-orange-50 min-h-screen ">
        <div className="grid grid-cols-3 items-center mb-2">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer"
            >
                <ArrowLeft size={20} />
                Back
            </button>
            <h1 className="text-2xl mb-3 text-center font-bold text-orange-600 underline underline-offset-8"> Goods Managemnt</h1>
        </div>
        {isLoading ? (
            <div className="flex justify-center items-center w-full">
                <BeatLoader size={20} color="#36d7b7" />
            </div>
        ) : (


            <div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center bg-white shadow-md rounded-xl p-6 relative hover:shadow-lg transition mb-3"
            >
                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Name:</span>{clientData?.data?.name}
                    </h2>

                </div>

                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Email:</span>{clientData?.data?.email ?? "N/A"}
                    </h2>

                </div>

                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Phone:</span>{clientData?.data?.phone.map((phone, index) => (
                            <span key={index}>{phone} {index !== clientData?.data?.phone.length - 1 && ", "}</span>

                        ))}
                    </h2>

                </div>



                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Address:</span>{clientData?.data?.address}
                    </h2>

                </div>
                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Company Name:</span>{clientData?.data?.companyName?.companyName}
                    </h2>

                </div>
                <div className="flex justify-between items-center ">
                    <h2 className="text-lg text-gray-600 ">
                        <span className="font-semibold text-orange-700">Gst No.:</span>{clientData?.data?.companyName?.gst}
                    </h2>

                </div>


            </div>

        )}

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

        <ClientGoodsDetailsYearlyComp clientedit={true} clientId={id} currentYear={currentYearAdd} />
    </div>;
}