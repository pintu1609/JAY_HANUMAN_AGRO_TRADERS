
"use client";


import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import CreateClientGoods from "@/compoment/clientGoodDetails/clientGoodsDetails/createClientGoods/CreateClientGoods";
import { useDeleteClientGood, useGetClientGoodsDetails } from "@/hook/clientGoodsDetails";
import { ClientGoodsItemParams } from "@/types/clientGoods/clientgoods";


export default function ClientGoodsDetailsYearlyComp({ currentYear }: any) {
    const [openClientModal, setOpenClientModal] = useState(false);
    const { data: clientRes, isLoading, refetch } = useGetClientGoodsDetails(currentYear);
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteClientGood(refetch);

    const ClientGoodsData: ClientGoodsItemParams[] = clientRes?.data || [];
    console.log("🚀 ~ SellerDetails ~ goodsData:", ClientGoodsData)


    const handleCreateGood = () => {
        setOpenClientModal(true);
    };

    const handleDeleteClientGoodsDetails = (id: string) => {
        if (confirm("Are you sure you want to delete this good?")) {
            mutateDelete(id);
        }
    };

    return (
        <div className="p-6 bg-orange-50 min-h-screen space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-orange-700 mb-4">
                    Year {currentYear} Goods
                </h1>
                <button className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg px-4 py-2"
                    onClick={() => handleCreateGood()}
                >
                    + Add Good
                </button>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <ClipLoader size={100} color="#36d7b7" />
                </div>
            ) : (

                (ClientGoodsData.length > 0) ? (



                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-2xl shadow-md mx-auto overflow-hidden">
                            <thead className="bg-orange-100 text-orange-800">
                                <tr>
                                    <th className="px-4 py-2 border ">Client Name</th>
                                    <th className="px-4 py-2 border ">Company NAME</th>
                                    <th className="px-4 py-2 border ">Vehicle No.</th>
                                    <th className="px-4 py-2 border ">Package</th>
                                    {/* <th className="px-4 py-2 border ">Weight</th>
                                <th className="px-4 py-2 border ">Rate</th> */}
                                    <th className="px-4 py-2 border ">Total Amt</th>
                                    <th className="px-4 py-2 border ">Date</th>
                                    <th className="px-4 py-2 border ">Bill No.</th>
                                    <th className="px-4 py-2 border ">Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                {ClientGoodsData.map((seller) => (
                                    <tr key={seller._id} className="text-center align-top">
                                        {/* Seller Info */}
                                        <td className="px-4 py-2 border text-center align-middle ">{seller.client?.name}</td>
                                        <td className="px-4 py-2 border text-center align-middle">{seller.company?.companyName}</td>
                                        <td className="px-4 py-2 border text-center align-middle">{seller.vehicleNumber}</td>
                                        <td className=" ">

                                            <table>
                                                <thead className="bg-orange-50">
                                                    <tr>
                                                        <th className="w-2/8 px-2 py-1 border">Package</th>
                                                        <th className="w-1/8 px-2 py-1 border">Weight</th>
                                                        <th className=" w-1/8 px-2 py-1 border">Rate</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {seller.packages.map((pyt) => (
                                                        <tr key={pyt._id}>
                                                            <td className="px-2 py-1 border">{pyt.package}</td>
                                                            <td className="px-2 py-1 border">
                                                                {pyt.weight}
                                                            </td>
                                                            <td className="px-2 py-1 border">
                                                                {pyt.rate}
                                                            </td>

                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="px-4 py-2 border text-center align-middle"> ₹{Number(seller.clientAmount || 0).toFixed(2)}</td>
                                        <td className="px-4 py-2 border text-center align-middle">{new Date(seller.date).toISOString().split("T")[0]}</td>
                                        <td className="px-4 py-2 border text-center align-middle">{seller.billNumber}</td>


                                        {/* Nested table for packages */}



                                        {/* Totals */}

                                        <td className="px-2 py-1 border align-middle">
                                            <button
                                                className="px-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            // onClick={() => handleEditSellerDetails(seller)}
                                            >
                                                <FiEye />
                                            </button>

                                            <button
                                                className="px-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            // onClick={() => handleEditSellerDetails(seller)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="px-1 text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={() => handleDeleteClientGoodsDetails(seller._id)}
                                            >
                                                <FiTrash2 />
                                            </button></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-3xl font-bold">Add Client Good Details</p>
                    </div>
                )
            )}
            {openClientModal && (
                <CreateClientGoods onClose={() => setOpenClientModal(false)} onSuccess={refetch}
                />
            )}
        </div>
    );
}