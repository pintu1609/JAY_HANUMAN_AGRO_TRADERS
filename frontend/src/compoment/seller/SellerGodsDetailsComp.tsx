
"use client";


import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { FiEdit, FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import { useDeleteSellerGood, useGetSellerGoodsDetailsWithPayment } from "@/hook/sellergoodsdetails";
import { PackageItem, PaymentItem, PaymentItemdetais, SellerGoodsDetailsParams, SellerGoodsParams, updateSellerParams } from "@/types/sellerDetails/sellerparam";
import CreateSellerPayment from "@/compoment/seller/SellerPayment/CreateSellerPayment";
import UpdateSellerPayment from "@/compoment/seller/SellerPayment/UpdateSellerPayment";
import { useDeleteSellerPayment } from "@/hook/sellerpayment";
import ShowPaymentDetails from "@/compoment/PaymentComp/showPayment/ShowPayment";
import CreateSeller from "@/compoment/seller/SellerDetails/CreateSeller/CreateSeller";
import UpdateSeller from "@/compoment/seller/SellerDetails/UpdateSeller/UpdateSeller";


export default function SellerGoodsDetailsComp({ currentYear }: any) {
    const [openSellerModal, setOpenSellerModal] = useState(false);
    const [openUpdateSellerdata, setOpenUpdateSellerdata] = useState<updateSellerParams | null>(null)
    const [openUpdateSellerModal, setOpenUpdateSellerModal] = useState(false)
    const [openSellerPaymentModal, setOpenSellerPaymentModal] = useState(false);

    const [paymentData, setPaymentData] = useState<null | {}>(null)

    const [openupdateSellerPaymentModal, setOpenUpdateSellerPaymentModal] = useState(false);

    const [updatePaymentData, setupdatePaymentData] = useState<null | PaymentItem>(null)


    const [openuPaymentDetailsModal, setOpenPaymentDetailsModal] = useState(false);

    const [paymentDetailsData, setPaymentDetailsData] = useState<null | PaymentItemdetais>(null)

    const { data: sellerRes, isLoading, refetch } = useGetSellerGoodsDetailsWithPayment(currentYear);
    console.log("🚀 ~ SellerGoodsDetailsComp ~ sellerRes:", sellerRes)
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteSellerGood(refetch);
    const { mutate: mutateSellerPaymentDelete, isPending: isDeletingSellerPayment } = useDeleteSellerPayment(refetch);

    const goodsData: SellerGoodsParams[] = sellerRes?.data || [];

    const handleAddPayment = (id: string) => {
        setPaymentData({ sellerId: id })
        setOpenSellerPaymentModal(true)
    };

    const handleEditPayment = (data: PaymentItem) => {
        setupdatePaymentData(data)
        setOpenUpdateSellerPaymentModal(true)

    };

    const handleDeletePayment = (paymentId: string) => {
        if (confirm("Are you sure you want to delete this payment?")) {
            mutateSellerPaymentDelete(paymentId);
        }
    };
    const handleShowPayment = (paymentData: PaymentItem, sellerName: string, sellerAddress: string) => {

        setPaymentDetailsData({
            _id: paymentData._id,
            amount: paymentData.amount,
            date: new Date(paymentData.date).toISOString().split("T")[0],
            paymentType: paymentData.paymentType,
            chequeNumber: paymentData.chequeNumber,
            fromAccount: paymentData.fromAccount,
            toAccount: paymentData.toAccount,
            name: sellerName,
            address: sellerAddress
        })
        setOpenPaymentDetailsModal(true)


    }


    const handleCreateGood = () => {
        setOpenSellerModal(true);
    };

    const handleEditSellerDetails = (seller: SellerGoodsDetailsParams) => {
        const updateData = {
            _id: seller._id,
            name: seller.name || "",
            address: seller.address || "",
            packages: seller.packages.map(pkg => ({
                _id: pkg._id,
                package: pkg.package,
                weight: pkg.weight,
                rate: pkg.rate,
                date: new Date(pkg.date).toISOString().split("T")[0],
                broker: pkg.broker?._id,
                amount: pkg.amount,
                commision: pkg.commision,
                wareHouse: pkg?.wareHouse
            })),
        };
        setOpenUpdateSellerdata(updateData)
        setOpenUpdateSellerModal(true);
    };

    const handleDeleteSellerDetails = (id: string) => {
        if (confirm("Are you sure you want to delete this good?")) {
            mutateDelete(id);
        }
    };

    return (
        <div className="p-6 bg-orange-50 min-h-screen space-y-6">
           <div className="flex justify-between gap-6 mb-4 text-lg font-semibold text-orange-800 bg-white p-4 rounded-lg shadow-md">
  <div>
    Total Good Amount:{" "}
    <span className="text-orange-600">₹{sellerRes?.grandTotalSellerAmount ? sellerRes?.grandTotalSellerAmount?.toFixed(2) : "0"} </span>
  </div>
  <div>
    Total Payment:{" "}
    <span className="text-green-600">₹{sellerRes?.grandTotalSellerPayment?.toFixed(2) || 0}</span>
  </div>
  <div>
    Due Amount:{" "}
    <span className="text-red-600">₹{(sellerRes?.grandTotalSellerAmount - sellerRes?.grandTotalSellerPayment)?.toFixed(2) || 0}</span>
  </div>
</div>
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

                (goodsData.length > 0) ? (



                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-2xl shadow-md mx-auto overflow-hidden">
                            <thead className="bg-orange-100 text-orange-800">
                                <tr>
                                    <th className="px-4 py-2 border w-1/10">Seller Name</th>
                                    <th className="px-4 py-2 border w-1/10">Address</th>
                                    <th className="px-4 py-2 border w-2/8">Packages</th>
                                    <th className="px-4 py-2 border w-1/10">Comm. Amt</th>
                                    <th className="px-4 py-2 border w-1/10">Total Amt</th>
                                    <th className="px-4 py-2 border w-1/12">Action</th>

                                    <th className="px-4 py-2 border w-3/8">Payment Details</th>
                                </tr>
                            </thead>

                            <tbody>
                                {goodsData.map((seller) => (
                                    <tr key={seller._id} className="text-center align-top">
                                        {/* Seller Info */}
                                        <td className="px-4 py-2 border text-center align-middle ">{seller.name}</td>
                                        <td className="px-4 py-2 border text-center align-middle">{seller.address}</td>

                                        {/* Nested table for packages */}
                                        <td className="px-0 py-0 border">
                                            <table className="w-full border-collapse">
                                                <thead className="bg-orange-50">
                                                    <tr>
                                                        <th className="w-2/8 px-2 py-1 border">Package</th>
                                                        <th className="w-1/8 px-2 py-1 border">Weight</th>
                                                        <th className=" w-1/8 px-2 py-1 border">Rate</th>
                                                        <th className="w-2/8 px-2 py-1 border">Date</th>
                                                        <th className="w-2/8 px-2 py-1 border">Broker</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {seller.packages.map((pkg: PackageItem) => (
                                                        <tr key={pkg._id}>
                                                            <td className="px-2 py-1 border">{pkg.package}</td>
                                                            <td className="px-2 py-1 border">{pkg.weight}</td>
                                                            <td className="px-2 py-1 border">₹{pkg.rate}</td>
                                                            <td className="px-2 py-1 border">
                                                                {new Date(pkg.date).toISOString().split("T")[0]}
                                                            </td>
                                                            <td className="px-2 py-1 border">{pkg.broker.name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>


                                        {/* Totals */}
                                        <td className="px-4 py-2 border text-center align-middle"> ₹{Number(seller.commisionAmount || 0).toFixed(2)}</td>
                                        <td className="px-4 py-2 border text-center align-middle"> ₹{Number(seller.totalAmount || 0).toFixed(2)}</td>

                                        <td className="px-2 py-1 border align-middle">

                                            <button
                                                className="px-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                onClick={() => handleEditSellerDetails(seller)}
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                className="px-1 text-red-500 hover:text-red-700 cursor-pointer"
                                                onClick={() => handleDeleteSellerDetails(seller._id)}
                                            >
                                                <FiTrash2 />
                                            </button></td>
                                        {/* nested table for payment */}
                                        <td className="px-0 py-0 border">
                                            {seller.payments.length > 0 ? (
                                                <table className="w-full border-collapse">
                                                    <thead className="bg-orange-50">
                                                        <tr>
                                                            <th className="w-2/8 px-2 py-1 border">Amount</th>
                                                            <th className="w-1/8 px-2 py-1 border">Date</th>
                                                            <th className=" w-1/8 px-2 py-1 border">Mode</th>
                                                            <th className="w-2/8 px-2 py-1 border">
                                                                Action

                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {seller.payments.map((pyt) => (
                                                            <tr key={pyt._id}>
                                                                <td className="px-2 py-1 border">{pyt.amount}</td>
                                                                <td className="px-2 py-1 border">
                                                                    {new Date(pyt.date).toISOString().split("T")[0]}
                                                                </td>
                                                                <td className="px-2 py-1 border">
                                                                    {pyt.paymentType === "BankTransfer" ? "Bank" : pyt.paymentType}
                                                                </td>
                                                                <td className="px-2 py-1 border">
                                                                    <button
                                                                        onClick={() => handleAddPayment(seller._id)}
                                                                        className="px-1 text-green-500 hover:text-green-700 cusror-pointer"
                                                                    >
                                                                        <FiPlus size={20} />
                                                                    </button>
                                                                    <button
                                                                        className="px-1 text-yellow-500 hover:text-yellow-700 cursor-pointer"
                                                                        onClick={() => {
                                                                            if (seller.name && seller.address) {

                                                                                handleShowPayment(pyt, seller.name, seller.address)
                                                                            }
                                                                        }}
                                                                    >
                                                                        <FiEye />
                                                                    </button>
                                                                    <button
                                                                        className="px-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                                        onClick={() => handleEditPayment(pyt)}
                                                                    >
                                                                        <FiEdit />
                                                                    </button>
                                                                    <button
                                                                        className="px-1 text-red-500 hover:text-red-700 cursor-pointer"
                                                                        onClick={() => handleDeletePayment(pyt._id)}
                                                                    >
                                                                        <FiTrash2 />
                                                                    </button></td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="flex flex-col justify-center items-center h-[80px] gap-2">
                                                    <button
                                                        onClick={() => handleAddPayment(seller._id)}
                                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                                                    >
                                                        <FiPlus /> Add Payment
                                                    </button>

                                                </div>
                                            )}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-3xl font-bold">Add Seller Good Details</p>
                    </div>
                )
            )}

            {openSellerPaymentModal && (
                <CreateSellerPayment paymentData={paymentData} onClose={() => setOpenSellerPaymentModal(false)} onSuccess={refetch}
                />
            )}

            {openupdateSellerPaymentModal && updatePaymentData && (

                < UpdateSellerPayment paymentdata={updatePaymentData} onClose={() => setOpenUpdateSellerPaymentModal(false)} onSuccess={refetch}
                />
            )}

            {openuPaymentDetailsModal && paymentDetailsData && (
                <ShowPaymentDetails paymentData={paymentDetailsData} onClose={() => setOpenPaymentDetailsModal(false)} />
            )}

            {openSellerModal && (
                <CreateSeller onClose={() => setOpenSellerModal(false)} onSuccess={refetch}
                />
            )}

            {openUpdateSellerModal && openUpdateSellerdata && (
                <UpdateSeller sellerData={openUpdateSellerdata} onClose={() => setOpenUpdateSellerModal(false)} onSuccess={refetch}
                />
            )}








        </div>
    );
}