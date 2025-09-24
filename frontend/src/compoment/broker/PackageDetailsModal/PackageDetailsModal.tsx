import { SellerGoodsItem } from "@/types/brokerdetails/broker.param";
import { X } from "lucide-react";

interface Props {
    packageDetails: SellerGoodsItem;
    onclose: () => void;
}

export default function PackageDetails({ packageDetails, onclose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 overflow-auto pt-20 px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onclose}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer"
                >
                    <X size={25} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-orange-700 mb-6 text-center underline underline-offset-8">
                    Package Details
                </h2>

                {/* Seller Info */}
                <div className=" flex justify-between items-center py-4 mb-4 border-b pb-3">
                    <p className="font-semibold text-gray-700">
                        Seller Name: <span className="text-orange-600">{packageDetails.sellerName}</span>
                    </p>
                    <p className="font-semibold text-gray-700">
                        Seller Address: <span className="text-orange-600">{packageDetails.sellerAddress}</span>
                    </p>
                </div>

                {/* Packages Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm text-sm">
                        <thead>
                            <tr className="bg-orange-100 text-orange-900 font-semibold">
                                <th className="p-3 border">S.No</th>
                                <th className="p-3 border">Package</th>
                                <th className="p-3 border">Weight</th>
                                <th className="p-3 border">Rate</th>
                                <th className="p-3 border">Amount</th>
                                <th className="p-3 border">Broker Comm.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {packageDetails.packages.map((item, index) => (
                                <tr key={index} className="hover:bg-orange-50">
                                    <td className="p-2 border text-center">{index + 1}</td>
                                    <td className="p-2 border text-center">{item.package}</td>
                                    <td className="p-2 border text-center">{item.weight}</td>
                                    <td className="p-2 border text-center">₹{item.rate}</td>
                                    <td className="p-2 border text-center">₹{item.amount.toFixed(2)}</td>
                                    <td className="p-2 border text-center">₹{item.brokerCommission.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-orange-100 text-orange-900 font-semibold">
                                <td className="p-2 border text-center">Total</td>
                                <td className="p-2 border text-center">
                                    {packageDetails.packages.reduce((sum, item) => sum + Number(item.package), 0)}
                                </td>
                                <td colSpan={2} className="p-2 border text-center">-</td>
                                <td className="p-2 border text-center">
                                    ₹{packageDetails.packages.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                                </td>
                                <td className="p-2 border text-center">
                                    ₹{packageDetails.totalBrokerCommission.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Close Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onclose}
                        className="cursor-pointer px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
