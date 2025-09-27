"use client";

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

export default function BrokerComp({ onClose, values, errors, touched, handleChange, handleBlur, handleSubmit, isPending, mode }: Props) {


  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-red-400 hover:text-red-600 cursor-pointer"
        >
          <X size={25} />
        </button>
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 max-h-[80vh] overflow-y-auto">

          <h2 className="text-3xl underline underline-offset-4 font-bold text-orange-700 mb-4 text-center underline-offset-8">{mode === "update" ? "Update Broker" : "Create Broker"}</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.name && touched.name ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter broker name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter broker email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter broker phone number"
              />
            </div>

            {/* Payment Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Calculation</label>
              <select
                name="paymentCalculation"
                value={values.paymentCalculation}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.paymentCalculation && touched.paymentCalculation
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
              >
                <option value="">Select Payment Type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>

            {/* Payment Value */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Payment Value</label>
              <input
                type="number"
                name="paymentValue"
                value={values.paymentValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.paymentValue && touched.paymentValue ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter payment value"
                min={0}
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {isPending ? <BeatLoader size={8} color="white" /> : (
                mode === "update" ? "Update Broker" : "Create Broker")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
