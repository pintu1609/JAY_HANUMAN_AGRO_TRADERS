import { Minus, Plus, X } from "lucide-react";
import { BeatLoader } from "react-spinners";

interface Props {
  onClose: () => void
  handleSubmit: any
  values: any
  errors: any
  touched: any
  handleChange: any
  handleBlur: any
  isPending: boolean
  mode: string
  addPhone: any
  removePhone: any
}

export default function CompanyComp({ onClose, handleSubmit, values, errors, touched, handleChange, handleBlur, isPending, mode, addPhone, removePhone }: Props) {

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-red-400 hover:text-red-600 cursor-pointer"
        >
          <X size={25} />
        </button>
                                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-4 max-h-[80vh] overflow-y-auto">


        <h2 className="text-3xl font-bold text-orange-700 mb-4 text-center underline underline-offset-8">
          {mode === "update" ? "Update Company" : "Create Company"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Owner Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.name && touched.name ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter owner name"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.companyName && touched.companyName ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter company name"
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
              placeholder="Enter email"
            />
          </div>

          {/* Phone numbers */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Numbers</label>
            {values.phone.map((num: string, index: number) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  name={`phone[${index}]`}
                  value={num}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.phone?.[index] && touched.phone?.[index] ? "border-red-500" : "border-gray-300"
                    }`}
                  placeholder="Enter phone number"
                />

                {/* Show + on last input, - on others */}
                {/* {index === values.phone.length - 1 && num.trim() !== "" && num.length >= 10 ? (
                  <button
                    type="button"
                    onClick={addPhone}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Plus size={18} />
                  </button>
                ) : index !== values.phone.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Minus size={18} />
                  </button>
                ) : null} */}

                {values.phone.length === 1 ? (
                  // Only one input
                  num.length >= 10 ? (
                    <button
                      type="button"
                      onClick={addPhone}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <Plus size={18} />
                    </button>
                  ) : null
                ) : index === values.phone.length - 1 ? (
                  // Last input when more than 1 input
                  num.length >= 10 ? (
                    <button
                      type="button"
                      onClick={addPhone}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <Plus size={18} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removePhone(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Minus size={18} />
                    </button>
                  )
                ) : (
                  // All other inputs
                  <button
                    type="button"
                    onClick={() => removePhone(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <Minus size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <textarea
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.address && touched.address ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter company address"
            />
          </div>

          {/* GST */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">GST No.</label>
            <input
              type="text"
              name="gst"
              value={values.gst}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border rounded-lg outline-none border-gray-300"
              placeholder="Enter GST number"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">PAN No.</label>
            <input
              type="text"
              name="pan"
              value={values.pan}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 border rounded-lg outline-none border-gray-300"
              placeholder="Enter PAN number"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
          >
            {isPending ? <BeatLoader size={8} color="white" /> : (mode === "update" ? "Update Company" : "Create Company")}
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}