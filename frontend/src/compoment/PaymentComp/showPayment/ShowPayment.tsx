import { PaymentItem } from "@/types/brokerdetails/broker.param";
import { PaymentItemdetais } from "@/types/sellerDetails/sellerparam";
import { X } from "lucide-react";

interface Props {
  paymentData: PaymentItemdetais;
  onClose: () => void;
}

export default function ShowPaymentDetails({ paymentData, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-start justify-center z-50 overflow-auto pt-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative max-h-[80vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer"
        >
          <X size={25} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-extrabold text-orange-700 mb-6 text-center underline underline-offset-8">
          Payment Details
        </h2>
        {(paymentData?.name || paymentData?.address) && (
          <div className="flex flex-col  gap-2">
            <p className="text-gray-700 font-semibold ">Name:
              <span className="text-orange-600 font-semibold "> {paymentData?.name}</span>
            </p>
            <p className="text-gray-700 font-semibold ">Address:
              <span className="text-orange-600 font-semibold "> {paymentData?.address}</span>
            </p>
          </div>
        )}
        <hr className="my-4 border-t-2 border-orange-300" />



        {/* Main Payment Info */}
        <div className="space-y-1 p-5 rounded-xl shadow-sm bg-orange-50">
          <div className="flex gap-2 items-center">
            <p className="text-gray-700 font-semibold text-lg ">Amount:</p>
            <p className="text-orange-600 font-medium ">₹{paymentData.amount.toFixed(2)}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-gray-700 font-semibold text-lg">Date:</p>
            <p className="text-orange-600 font-medium text-lg">{paymentData.date.split("T")[0]}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-gray-700 font-semibold text-lg">Payment Type:</p>
            <p className="text-orange-600 font-medium ">{paymentData.paymentType}</p>
          </div>
          {paymentData.chequeNumber && (
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 font-semibold text-lg">Cheque No:</p>
              <p className="text-orange-600 font-medium ">{paymentData.chequeNumber}</p>
            </div>
          )}
        </div>

        {/* From Account Section */}
        {paymentData.fromAccount && (
          <div className="mt-5 p-5 border-l-4 border-orange-400 bg-orange-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-orange-700 mb-3">From Account</h3>
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 font-semibold text-lg">Holder Name:</p>
              <p className="text-orange-600 font-medium">{paymentData.fromAccount.accountHolderName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 font-semibold text-lg">Account Number:</p>
              <p className="text-orange-600 font-medium ">{paymentData.fromAccount.accountNumber}</p>
            </div>
            {paymentData?.fromAccount?.ifscCode && (
              <div className="flex gap-2 items-center">
                <p className="text-gray-700 font-semibold text-lg">IFSC Code:</p>
                <p className="text-orange-600 font-medium ">{paymentData?.fromAccount?.ifscCode}</p>
              </div>

            )}
          </div>
        )}

        {/* To Account Section */}
        {paymentData.toAccount && (
          <div className="mt-5 p-5 border-l-4 border-orange-400 bg-orange-50 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold text-orange-700 mb-3">To Account</h3>
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 font-semibold text-lg ">Holder Name:</p>
              <p className="text-orange-600 font-medium ">{paymentData.toAccount.accountHolderName}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 font-semibold text-lg ">Account Number:</p>
              <p className="text-orange-600 font-medium ">{paymentData.toAccount.accountNumber}</p>
            </div>
            {paymentData?.toAccount?.ifscCode && (

              <div className="flex gap-2 items-center">
                <p className="text-gray-700 font-semibold text-lg ">IFSC Code:</p>
                <p className="text-orange-600 font-medium ">{paymentData?.toAccount?.ifscCode}</p>
              </div>
            )}
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="cursor-pointer px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
