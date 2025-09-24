"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, UserPlus } from "lucide-react";
import { BeatLoader, ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useGetBrokerDetails } from "@/hook/brokerdetails";
import { BrokerDetailsType } from "@/types/brokerdetails/broker.param";
import { number } from "zod";
import BrokerYearlyReportComp from "@/compoment/broker/BrokerYearlyReportComp";
import CreateBrokerBayment from "@/compoment/broker/BrokerPayment/CreateBrokerPayment";

export default function BrokerDetails() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
        const currentYear = new Date().getFullYear();

    const [currentYearAdd, setCurrentYearAdd] = useState(currentYear);

    const { data, isLoading, isError, error } = useGetBrokerDetails(id as string);
    const [addBrokerPayment, setAddBrokerPayment] = useState(false)

    // const handleDelete = async (id: string) => {
    //     if (confirm("Are you sure you want to delete this broker?")) {
    //         try {
    //             await mutateAsync(id);
    //             toast.success("Broker deleted successfully");
    //         } catch (err) {
    //             toast.error("Failed to delete broker");
    //         }
    //     }
    // };

    const AddBrokerPayment = () => {
        setAddBrokerPayment(true)

    }
    const years = Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i);


    const brokersData: BrokerDetailsType = data?.data || {
        _id: "",
        userId: "",
        name: "",
        email: "",
        phone: "",
        paymentCalculation: "",
        paymentValue: 0,
        createdAt: "",
        updatedAt: "",
    };

    const handleClickYear = (year: number) => {
        setCurrentYearAdd(year);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-orange-50">
                <ClipLoader size={100} color="#36d7b7" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 p-6">
                Error fetching brokers: {(error as Error)?.message}
            </div>
        );
    }

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
                <h1 className="text-2xl font-bold text-orange-700 text-center">Broker Management</h1>


            </div>



            {/* Broker Cards */}

            {isLoading ? (
                <div className="flex justify-center items-center w-full">
                    <BeatLoader size={20} color="#36d7b7" />
                </div>
            ) : (


                <div
                    className="flex justify-between items-center bg-white shadow-md rounded-xl p-6 relative hover:shadow-lg transition"
                >
                    <div className="flex justify-between items-center ">
                        <h2 className="text-lg text-gray-600 ">
                            <span className="font-semibold text-orange-700">Name:</span>{brokersData?.name}</h2>

                    </div>
                    <p className="text-gray-600">
                        <span className="font-semibold text-orange-700">Email:</span>{brokersData.email}</p>

                    <p className=" text-gray-700">
                        <span className="font-semibold text-orange-700">Phone:</span> {brokersData.phone}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold text-orange-700">Payment:</span>
                        {brokersData.paymentValue}{brokersData.paymentCalculation === "percentage" ? "%" : ""}
                    </p>


                </div>

            )}

            <div className="mt-8 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-orange-700 ">Years</h3>
                    {/* <div className=""> */}
                    {/* Payment Button */}

                    <button
                        onClick={() => AddBrokerPayment()}
                        className="cursor-pointer bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-orange-700 transition"
                    >
                        Make Payment
                    </button>
                    {/* </div> */}

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



            </div>

            <div className="p-6 w-full">
                {currentYearAdd && <BrokerYearlyReportComp id={id} currentYear={currentYearAdd} onClose={() => setAddBrokerPayment(false)} addBrokerPayment={addBrokerPayment}  />}
            </div>

            {/* <div>
                {addBrokerPayment && <CreateBrokerBayment onClose={() => setAddBrokerPayment(false)} brokerId={id} />
                }
            </div> */}
        </div>
    );
}
