
import { BeatLoader } from "react-spinners";
import { X } from "lucide-react";
import { useGetAllClientDetails } from "@/hook/clientdetails";

interface Props {
  clientedit?: boolean
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

export default function ClientPaymentDetailsForm({ clientedit, onClose, values, errors, touched, handleChange, handleBlur, handleSubmit, isPending, mode }: Props) {
  const { data: client } = useGetAllClientDetails();




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

          <h2 className="text-xl font-bold text-orange-700 mb-4 text-center underline underline-offset-8">
            {mode === "update" ? "Update Payment Details" : "Add Payment Details"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* select client id */}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Client Name</label>
              <select
                name="clientId"
                value={values.clientId}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={clientedit ? true : false}

                className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.clientId && touched.clientId ? "border-red-500" : "border-gray-300"
                  } ${clientedit ? "bg-gray-200 cursor-not-allowed" : ""}`}
              >
                <option value="">Select Client</option>
                {client?.data?.map((b, i) => (
                  <option key={i} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
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
            {(values.paymentType === "Cheque") && (
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

            {/* Account Number (only if phonepay/BankTransfer) */}
            {(values.paymentType != "Cash") && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={values.accountNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300 ${errors.accountNumber && touched.accountNumber ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter cheque number"
                />
              </div>
            )}




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
