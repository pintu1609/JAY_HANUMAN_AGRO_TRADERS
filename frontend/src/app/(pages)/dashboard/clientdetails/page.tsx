"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, Trash2, UserPlus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useDeleteClientDetails, useGetAllClientDetails } from "@/hook/clientdetails";
import { ClientDetailsType } from "@/types/clientdetails/clientdetails";
import CreateClient from "@/compoment/clientDetails/createClient/CreateClient";
import UpdateClient from "@/compoment/clientDetails/updateClient/UpdateClient";

export default function ClientDetails() {
    const router = useRouter();
    const [openCreateClient, setOpenCreateClient] = useState(false);
    const [openUpdateClient, setopenUpdateClient] = useState(false)

    const [updateClientData, setupdateClientData] = useState<null | ClientDetailsType>(null)

    const { data, isLoading, isError, error, refetch } = useGetAllClientDetails();
    const { mutateAsync, isPending } = useDeleteClientDetails(refetch);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this broker?")) {
            try {
                await mutateAsync(id);
                toast.success("Broker deleted successfully");
            } catch (err) {
                console.error("Error deleting broker:", err);
                toast.error("Failed to delete broker");
            }
        }
    };


    const handleCreateClient = () => {
        setOpenCreateClient(true);
    };

    const handleUpdateClient = (data: ClientDetailsType) => {
        setopenUpdateClient(true)
        setupdateClientData(data)
    }

    const clientData: ClientDetailsType[] = data?.data || [];

    const handleClick = (id: string) => {
        router.push(`/dashboard/clientdetails/${id}`);
    }
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color="#36d7b7" />
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
            <div className="grid grid-cols-3 items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-orange-700 text-center">Client Management</h1>


            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Create Broker Card */}
                <div
                    onClick={() => handleCreateClient()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-orange-400 rounded-xl p-6 cursor-pointer hover:bg-orange-100 transition"
                >
                    <UserPlus size={40} className="text-orange-600 mb-2" />
                    <span className="text-orange-700 font-semibold">Create Client</span>
                </div>

                {/* Broker Cards */}
                {clientData.map((client) => (
                    <div
                        key={client._id}
                        onClick={() => handleClick(client._id)}
                        className="bg-white shadow-md rounded-xl p-6 relative hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-orange-700">
                                <span className="font-semibold">Name:</span>{client.name}</h2>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateClient(client)
                                    }}>
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(client._id)
                                    }}
                                    className={`text-red-600 hover:text-red-800 cursor-pointer ${isPending ? "cursor-not-allowed" : ""}`}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                        </div>
                        <p className="text-gray-600 flex items-center gap-1">
                            <span className="font-semibold ">Email:</span> <span>
                                {client.email ? client.email : "-"}
                            </span>
                        </p>

                        <div className="flex items-top justify-start mt-2 gap-1">

                            <p className="flex text-gray-700">
                                <span className="font-semibold">

                                    Phone:</span>
                            </p>
                            <p>
                                {client.phone && client.phone.map((phone, index) =>

                                    <span key={phone} className="flex flex-col">
                                        {phone}
                                        {index !== client.phone.length - 1 && ", "}
                                    </span>

                                )}
                            </p>
                        </div>
                        <div className="flex items-top justify-start mt-2 gap-1">
                            <p className="flex-shrink-0 text-gray-700">
                                <span className="font-semibold">Address:</span>
                            </p>
                            <p className="flex flex-wrap break-words text-gray-700">
                                {client.address}
                            </p>

                        </div>
                        <div className="flex items-top justify-start mt-2 gap-1">
                            <p className="flex-shrink-0 text-gray-700">
                                <span className="font-semibold">Company Name:</span>
                            </p>
                            <p className="flex flex-wrap break-words text-gray-700">
                                {client?.companyName?.companyName ? client.companyName?.companyName : "-"}
                            </p>

                        </div>
                        {client.companyName?.gst && (
                            <div className="flex items-top justify-start mt-2 gap-1">
                                <p className="flex-shrink-0 text-gray-700">
                                    <span className="font-semibold">GST No.:</span>
                                </p>
                                <p className="flex flex-wrap break-words text-gray-700">
                                    {client.companyName?.gst}
                                </p>

                            </div>)}
                        {/* Action buttons */}

                    </div>
                ))}
            </div>
            {
                openCreateClient &&
                <CreateClient onClose={() => setOpenCreateClient(false)} onSuccess={refetch} />
            }

            {openUpdateClient && updateClientData &&
                <UpdateClient onClose={() => setopenUpdateClient(false)} onSuccess={refetch} clientData={updateClientData} />
            }
        </div>
    );
}
