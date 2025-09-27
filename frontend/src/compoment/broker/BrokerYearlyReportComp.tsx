"use client"

import { useGetSellerGoodsByBrokerId } from "@/hook/sellergoodsbroker";
import { PaymentItem, SellerGoodsItem, SellerGoodsParams } from "@/types/brokerdetails/broker.param";
import { useState } from "react";
import { FiEdit, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import PackageDetails from "./PackageDetailsModal/PackageDetailsModal";
import ShowPaymentDetails from "../PaymentComp/showPayment/ShowPayment";
import { ClipLoader } from "react-spinners";
import { useDeleteBrokerPayment } from "@/hook/brokerPayment";
import toast from "react-hot-toast";
import CreateBrokerPayment from "./BrokerPayment/CreateBrokerPayment";
import UpdateBrokerPayment from "./BrokerPayment/UpdateBrokerPayment";

interface Props {
    id: string
    currentYear: number
    onClose: () => void
    addBrokerPayment: boolean
}

export default function BrokerYearlyReportComp({ id, currentYear, onClose, addBrokerPayment }: Props) {

    const { data, isLoading, refetch } = useGetSellerGoodsByBrokerId(id, currentYear);

    const [openPackgeModal, setOpenPackgeModal] = useState(false)
    const [packageDetails, setPackageDetails] = useState<SellerGoodsItem | null>(null);
    const [openShowPaymentModal, setOpenShowPaymentModal] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState<PaymentItem | null>(null);

    const [openUpdatePaymentModal, setOpenUpdatePaymentModal] = useState(false)
    const [updatePaymentDta, setUpdatePaymentDta] = useState<PaymentItem | null>(null)

    const { mutateAsync, isPending } = useDeleteBrokerPayment(refetch)

    const sellerData: SellerGoodsParams | undefined = data?.data

    const handleshowPackageDetails = (packageData: SellerGoodsItem) => {
        setPackageDetails(packageData)
        setOpenPackgeModal(true)

    }

    const handleshowPaymentDetails = (data: PaymentItem) => {
        setPaymentDetails(data)
        setOpenShowPaymentModal(true)
    }

    const handlePaymentDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this payment?")) {
            try {
                await mutateAsync(id);
                toast.success("Payment deleted successfully");
            } catch (err) {
                toast.error("Failed to delete payment");
            }
        }
    };

    const handleEditPayment = (data: PaymentItem) => {
        setUpdatePaymentDta(data)
        setOpenUpdatePaymentModal(true)
    }

    return <div>

        {isLoading ? (
            <div className="flex justify-center items-center h-2/3">
                <ClipLoader size={100} color="#36d7b7" />
            </div>
        ) : (
            (sellerData && sellerData?.totalCount > 0) ? (


                <div className="overflow-x-auto">
                    <table className="w-full border rounded-2xl overflow-hidden shadow-md">

                        <tbody>
                            <tr className="border">
                                <td className="align-top w-2/3">

                                    <table className="w-full border border-gray-300">
                                        <thead>
                                            <tr className="bg-orange-100 text-orange-900 text-sm">
                                                <th className="p-3 border"> Name</th>
                                                <th className="p-3 border">Address</th>
                                                <th className="p-3 border">Package</th>
                                                <th className="p-3 border">Weight</th>
                                                <th className="p-3 border">Rate</th>
                                                <th className="p-3 border">Ttl. Amt</th>
                                                <th className="p-3 border">Ttl Comm.</th>
                                                <th className="p-3 border-l border-t ">Action</th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sellerData && sellerData.data && sellerData.data.map((item, index) => {
                                                const totalPackage = item.packages.reduce((total, packageItem) => total + Number(packageItem.package), 0);
                                                const totalAmt = item.packages.reduce((total, packageItem) => total + Number(packageItem.amount), 0);

                                                return (

                                                    <tr key={index} className="hover:bg-orange-50 text-sm">
                                                        <td className="p-2 border text-center">{item.sellerName}</td>
                                                        <td className="p-2 border text-center">{item.sellerAddress}</td>
                                                        <td className="p-2 border text-center">{totalPackage}</td>
                                                        <td className="p-2 border text-center">{item.packages[0].weight}</td>
                                                        <td className="p-2 border text-center">₹{item.packages[0].rate}</td>
                                                        <td className="p-2 border text-center">{totalAmt.toFixed(2)}</td>
                                                        <td className="p-2 border text-center">₹{item.totalBrokerCommission.toFixed(2)}</td>
                                                        <td className="p-2 border-l border-t text-center">
                                                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                                onClick={() => handleshowPackageDetails(item)}>
                                                                <FiEye
                                                                    size={18} className="text-gray-500" />
                                                            </button>
                                                        </td>
                                                    </tr>

                                                );
                                            })}
                                        </tbody>

                                        <tfoot>
                                            <tr className="bg-orange-100 text-orange-900 font-semibold text-sm">
                                                <td colSpan={2} className="p-2 border text-center">
                                                    Total
                                                </td>
                                                <td className="p-2 border text-center">
                                                    {sellerData?.data?.reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            item.packages.reduce(
                                                                (t, pkg) => t + Number(pkg.package),
                                                                0
                                                            ),
                                                        0
                                                    )}
                                                </td>
                                                <td colSpan={2} className="p-2 border text-center">-</td>
                                                <td className="p-2 border text-center">
                                                    ₹
                                                    {sellerData?.data
                                                        ?.reduce(
                                                            (sum, item) =>
                                                                sum +
                                                                item.packages.reduce(
                                                                    (t, pkg) => t + Number(pkg.amount),
                                                                    0
                                                                ),
                                                            0
                                                        )
                                                        .toFixed(2)}
                                                </td>
                                                <td className="p-2 border text-center">
                                                    ₹
                                                    {sellerData?.data
                                                        ?.reduce((sum, item) => sum + item.totalBrokerCommission, 0)
                                                        .toFixed(2)}
                                                </td>
                                                <td className="p-2 border-l border-t border-b"></td>
                                            </tr>
                                        </tfoot>

                                    </table>

                                </td>
                                <td className="align-top w-1/3">
                                    <table className="w-full border border-gray-300 ">
                                        <thead>
                                            <tr className="bg-orange-100 text-orange-900 text-sm">
                                                <th className="p-3 border"> Amt Taken</th>
                                                <th className="p-3 border">Date</th>
                                                <th className="p-3 border">Mode</th>
                                                <th className="p-3 border">Action</th>



                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sellerData && sellerData.payment && sellerData.payment.map((pyt, index) => {

                                                return (

                                                    <tr key={index} className="hover:bg-orange-50 text-sm">
                                                        <td className="p-2 border text-center">{pyt.amount}</td>
                                                        <td className="p-2 border text-center">{pyt.date.split("T")[0]}</td>
                                                        <td className="p-2 border text-center">{pyt.paymentType}</td>

                                                        <td className="p-2 border text-center align-middle space-x-1">
                                                            {/* <button className="text-blue-600 hover:text-blue-800 cursor-pointer">

                                                        <FiPlus size={20} className="text-green-500" />
                                                    </button> */}
                                                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                                onClick={() => handleshowPaymentDetails(pyt)}>
                                                                <FiEye
                                                                    size={18} className="text-gray-500" />
                                                            </button>
                                                            <button className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                                onClick={() => handleEditPayment(pyt)}>
                                                                <FiEdit size={18} className="" />
                                                            </button>
                                                            <button
                                                                onClick={() => handlePaymentDelete(pyt._id)}
                                                                className={`text-red-600 hover:text-red-800 cursor-pointer
                                                            ${isPending ? "cursor-not-allowed" : ""}
                                         `}
                                                            >
                                                                <FiTrash2 size={18} />
                                                            </button>
                                                        </td>

                                                    </tr>

                                                )
                                            })}

                                        </tbody>

                                        <tfoot>
                                            <tr className="bg-orange-100 text-orange-900 font-semibold text-sm">
                                                <td colSpan={4} className="p-2 border text-center">
                                                    Total Payment:

                                                    ₹
                                                    {sellerData?.payment
                                                        ?.reduce((sum, p) => sum + p.amount, 0)
                                                        .toFixed(2)}
                                                </td>

                                            </tr>
                                        </tfoot>
                                    </table>

                                </td>
                            </tr>
                        </tbody>




                    </table>


                </div>

            ) : (
                <div className="flex justify-center items-center h-1/2">
                    <p className="text-2xl font-bold text-gray-600">No Seller Details for this Broker</p>
                </div>
            )

        )}

        {
            openPackgeModal && packageDetails && (
                <PackageDetails packageDetails={packageDetails} onclose={() => setOpenPackgeModal(false)} />
            )
        }

        {
            openShowPaymentModal && paymentDetails && (
                <ShowPaymentDetails paymentData={paymentDetails} onClose={() => setOpenShowPaymentModal(false)} />
            )
        }

        <div>
            {addBrokerPayment && <CreateBrokerPayment onClose={onClose} brokerId={id} onSuccess={refetch} />
            }
        </div>

        {
            updatePaymentDta && openUpdatePaymentModal && <UpdateBrokerPayment onClose={() => setOpenUpdatePaymentModal(false)} onSuccess={refetch} paymentdata={updatePaymentDta} />
        }
    </div>;
}