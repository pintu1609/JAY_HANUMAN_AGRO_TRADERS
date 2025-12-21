"use client";

import { BeatLoader } from "react-spinners";
import {  X } from "lucide-react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useGetAllBrokerDetails } from "@/hook/brokerdetails";

interface Package {
    package: string;
    weight: number;
    rate: number;
    date: string;
    commision: number;
    broker: string;
    wareHouse: boolean
}

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
    setFieldValue: any
}

export default function SellerGoodsComp({
    onClose,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isPending,
    mode,
}: Props) {
    const addPackage = () => {
        const newPackage = { package: "", weight: 0, rate: 0, date: "", commision: 0, broker: "", wareHouse: false };
        setFieldValue("packages", [...values.packages, newPackage]);

    };
    const { data: brokers } = useGetAllBrokerDetails()

    const removePackage = (index: number) => {
        const updated = values.packages.filter((_: any, i: number) => i !== index);
        setFieldValue("packages", updated);
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-8 text-red-400 hover:text-red-600 cursor-pointer"
                >
                    <X size={25} />
                </button>



                {/* Form */}

                {/* <div className="flex items-center justify-center  bg-orange-50"> */}
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 max-h-[80vh] overflow-y-auto">
                    <h1 className="text-2xl font-bold text-center text-orange-700 mb-6 underline underline-offset-4">
                        🕉️ {mode === "update" ? "Update Seller Goods" : "Create Seller"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Seller Info */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={values.name || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}

                                className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300  ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter seller name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={values.address || ""}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 border rounded-lg outline-none border-gray-300  ${errors.address && touched.address ? "border-red-500" : "border-gray-300"}`}
                                placeholder="Enter seller address"

                            />
                        </div>

                        {/* Packages */}
                        <h2 className="text-xl font-semibold text-orange-700">Packages</h2>
                        {values.packages.map((pkg: Package, index: number) => (
                            <div className="flex gap-1" key={index}>
                                <div

                                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 border-none rounded-lgitems-center"
                                >
                                    <input
                                        type="text"
                                        placeholder="Package"
                                        value={pkg.package}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].package`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300  ${errors.packages?.[index]?.package && touched.packages?.[index]?.package ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={pkg.weight}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].weight`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300  ${errors.packages?.[index]?.weight && touched.packages?.[index]?.weight ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Rate"
                                        value={pkg.rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].rate`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300  ${errors.packages?.[index]?.rate && touched.packages?.[index]?.rate
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    <input
                                        type="date"
                                        value={pkg.date}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        name={`packages[${index}].date`}

                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300 ${errors.packages?.[index]?.date && touched.packages?.[index]?.date ?
                                            "border-red-500" : "border-gray-300"
                                            }`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Commission"
                                        value={pkg.commision}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].commision`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300  ${errors.packages?.[index]?.commision && touched.packages?.[index]?.commision ? "border-red-500" : "border-gray-300"}`}
                                    />
                                    <select
                                        name={`packages[${index}].broker`}
                                        value={pkg.broker}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={` px-4 py-2 border rounded-lg outline-none ${errors.packages?.[index]?.broker && touched.packages?.[index]?.broker
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}>
                                        <option value="">Select Broker</option>
                                        {brokers?.data?.map((b, i) => (
                                            <option key={i} value={b._id}>
                                                {b.name}
                                            </option>
                                        ))}
                                    </select>

                                    {/* <select
                                    // name={`packages[${index}].broker`}
                                    // value={pkg.broker}
                                    // onChange={handleChange}
                                    // onBlur={handleBlur}
                                    className={` px-4 py-2 border rounded-lg outline-none ${errors.packages?.[index]?.broker && touched.packages?.[index]?.broker
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}>
                                    <option value="">Select Warehouse</option>
                                    <option value="WareHouse">WareHouse</option>
                                    {/* {brokers?.data?.map((b, i) => (
                                        <option key={i} value={b._id}>
                                            {b.name}
                                        </option>
                                    ))} */}
                                    {/*</select> */}

                                    <div className="flex items-center gap-2">

                                        <input
                                            type="checkbox"
                                            checked={pkg.wareHouse || false}
                                            name={`packages[${index}].wareHouse`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="toggle-checkbox"
                                        />
                                        <label className="text-lg font-medium text-gray-700">
                                            Warehouse
                                        </label>
                                    </div>

                                    {/* Remove Button */}
                                </div>
                                {values.packages.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePackage(index)}
                                        className="  text-white rounded-lg transition"
                                    >
                                        <AiFillCloseCircle size={22} color="red" />
                                    </button>)}
                            </div>
                        ))}

                        {/* Add Package */}
                        <button
                            type="button"
                            onClick={addPackage}
                            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-2 py-2 rounded-lg transition"
                        >
                            <AiOutlinePlus size={20} />Add Package
                        </button>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                            >
                                {isPending ? <BeatLoader size={8} color="white" /> : (mode === "update" ? "Update Goods" : "Add Good")}
                            </button>
                        </div>
                    </form>
                    {/* </div> */}
                </div>

            </div>
        </div>
    );
}
