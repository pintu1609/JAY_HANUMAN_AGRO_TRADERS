"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, UserPlus } from "lucide-react";
import { BeatLoader, ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDeleteBrokerDetails, useGetAllBrokerDetails } from "@/hook/brokerdetails";
import { BrokerDetailsType, UpdateBrokerType } from "@/types/brokerdetails/broker.param";
import CreateBroker from "@/compoment/broker/createBroker/CreateBroker";
import UpdateBroker from "@/compoment/broker/updateBroker/UpdateBroker";

export default function Broker() {
    const router = useRouter();

    const { data, isLoading, isError, error, refetch } = useGetAllBrokerDetails();
    const { mutateAsync, isPending } = useDeleteBrokerDetails(refetch);
    const [createBroker, setCreateBroker] = useState(false)
    const [updateBroker, setUpdateBroker] = useState(false)
    const [brokerData, setbrokerData] = useState<UpdateBrokerType | null>(null)

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this broker?")) {
            try {
                await mutateAsync(id);
                toast.success("Broker deleted successfully");
            } catch (err) {
                toast.error("Failed to delete broker");
            }
        }
    };

    const brokersData: BrokerDetailsType[] = data?.data || [];

    const handleCreateBroker=()=>{
setCreateBroker(true)
    }

    const handleUpdateBroker=(updateData:BrokerDetailsType)=>{
        setbrokerData({
            id: updateData._id,
            name: updateData.name,
            email: updateData?.email,
            phone: updateData.phone,
            paymentCalculation: updateData.paymentCalculation,
            paymentValue: updateData.paymentValue
        })
        setUpdateBroker(true)
    }

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
                    className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-orange-700 text-center">Broker Management</h1>


            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Create Broker Card */}
                <div
                    onClick={() => handleCreateBroker()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-xl p-6 cursor-pointer hover:bg-orange-100 transition"
                >
                    <UserPlus size={40} className="text-orange-600 mb-2" />
                    <span className="text-orange-700 font-semibold">Create Broker</span>
                </div>

                {/* Broker Cards */}

                {isLoading ? (
                    <div className="flex justify-center items-center w-full">
                        <BeatLoader size={20} color="#36d7b7" />
                    </div>
                ) : (
                    brokersData.length > 0 ? (


                        brokersData.map((broker) => (
                            <div
                                key={broker._id}
                                onClick={() => router.push(`/dashboard/brokerdetails/${broker._id}`)}
                                className="bg-white shadow-md rounded-xl p-6 relative hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-bold text-orange-700">
                                        <span className="font-semibold">Name:</span>{broker.name}</h2>
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                        onClick={(e) => { e.stopPropagation();
                                                 handleUpdateBroker(broker)}}
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation();
                                                 handleDelete(broker._id)}}
                                            className={`text-red-600 hover:text-red-800 cursor-pointer ${isPending ? "cursor-not-allowed" : ""}`}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                </div>
                                <p className="text-gray-600">     
                                 <span className="font-semibold">Email:</span>{broker.email}</p>

                                <p className="mt-2 text-gray-700">
                                    <span className="font-semibold">Phone:</span> {broker.phone}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Payment:</span>
                                    {broker.paymentValue}{broker.paymentCalculation === "percentage" ? "%" : ""}
                                </p>


                            </div>
                        ))) : (
                        <div className="flex justify-center items-center w-full text-center text-red-500 p-6">
                            <p
                                className="text-center text-red-500 p-6 text-2xl">
                                No brokers found
                            </p>
                        </div>
                    )
                )}
            </div>

            {createBroker &&
                <CreateBroker onClose={() => setCreateBroker(false)} onSuccess={refetch}/>

            }

            {updateBroker && brokerData &&
            <UpdateBroker onClose={() => setUpdateBroker(false)} onSuccess={refetch} brokerData={brokerData} />}
        </div>
    );
}
