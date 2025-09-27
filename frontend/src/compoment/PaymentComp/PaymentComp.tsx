
import { BeatLoader } from "react-spinners";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: any;
  isPending: boolean;
  mode: string;
}

export default function PaymentDetailsForm({ onClose, values, errors, touched, handleChange, handleBlur, handleSubmit, isPending, mode }: Props) {



  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-red-400 hover:text-red- 600 cursor-pointer"
        >
          <X size={25} />
        </button>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 max-h-[80vh] overflow-y-auto">

          <h2 className="text-xl font-bold text-orange-700 mb-4 text-center">
            {mode === "update" ? "Update Payment Details" : "Add Payment Details"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={values.amount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.amount && touched.amount ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter amount"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.date && touched.date ? "border-red-500" : "border-gray-300"
                  }`}
              />
            </div>

            {/* Payment Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Type</label>
              <select
                name="paymentType"
                value={values.paymentType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${errors.paymentType && touched.paymentType ? "border-red-500" : "border-gray-300"}`}

              >
                <option value="Cash">Cash</option>
                <option value="Cheque">Cheque</option>
                <option value="BankTransfer">Bank Transfer</option>
                <option value="PhonePe">PhonePe</option>
              </select>
            </div>

            {/* Cheque Number (only if Cheque/BankTransfer) */}
            {(values.paymentType === "Cheque" || values.paymentType === "BankTransfer") && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Cheque Number</label>
                <input
                  type="text"
                  name="chequeNumber"
                  value={values.chequeNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${errors.chequeNumber && touched.chequeNumber ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter cheque number"
                />
              </div>
            )}

            {/* From Account (not for Cash) */}
            <div className="flex gap-4">


              {values.paymentType !== "Cash" && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">From Account</label>
                  <input
                    type="text"
                    name="fromAccount.accountHolderName"
                    value={values.fromAccount.accountHolderName}
                    onChange={handleChange}
                    placeholder="Account Holder Name"
                    className={`w-full px-4 py-2 mb-2 border rounded-lg border-gray-300 outline-none ${errors.fromAccount?.accountHolderName && touched.fromAccount?.accountHolderName ? "border-red-500" : "border-gray-300"}`}
                  />
                  <input
                    type="text"
                    name="fromAccount.accountNumber"
                    value={values.fromAccount.accountNumber}
                    onChange={handleChange}
                    placeholder="Account Number/Phone Number"
                    className={`w-full px-4 py-2 mb-2 border rounded-lg border-gray-300 outline-none ${errors.fromAccount?.accountNumber && touched.fromAccount?.accountNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {values.paymentType === "BankTransfer" && (
                    <input
                      type="text"
                      name="fromAccount.ifscCode"
                      value={values.fromAccount.ifscCode}
                      onChange={handleChange}
                      placeholder="IFSC Code"
                      className={`w-full px-4 py-2 border rounded-lg border-gray-300 outline-none ${errors.fromAccount?.ifscCode && touched.fromAccount?.ifscCode ? "border-red-500" : "border-gray-300"}`}
                    />
                  )}
                </div>
              )}

              {/* To Account (not for Cash) */}
              {values.paymentType !== "Cash" && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">To Account</label>
                  <input
                    type="text"
                    name="toAccount.accountHolderName"
                    value={values.toAccount.accountHolderName}
                    onChange={handleChange}
                    placeholder="Account Holder Name"
                    className={`w-full px-4 py-2 mb-2 border rounded-lg border-gray-300 outline-none ${errors.toAccount?.accountHolderName && touched.toAccount?.accountHolderName ? "border-red-500" : "border-gray-300"}`}
                  />
                  <input
                    type="text"
                    name="toAccount.accountNumber"
                    value={values.toAccount.accountNumber}
                    onChange={handleChange}
                    placeholder="Account Number/Phone Number"
                    className={`w-full px-4 py-2 mb-2 border rounded-lg border-gray-300 outline-none ${errors.toAccount?.accountNumber && touched.toAccount?.accountNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {values.paymentType === "BankTransfer" && (

                    <input
                      type="text"
                      name="toAccount.ifscCode"
                      value={values.toAccount.ifscCode}
                      onChange={handleChange}
                      placeholder="IFSC Code"
                      className={`w-full px-4 py-2 border rounded-lg border-gray-300 outline-none ${errors.toAccount?.ifscCode && touched.toAccount?.ifscCode ? "border-red-500" : "border-gray-300"}`}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer flex items-center justify-center"
            >
              {isPending ? <BeatLoader size={8} color="white" /> : (
                mode === "update" ? "Update Payment" : "Add Payment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
