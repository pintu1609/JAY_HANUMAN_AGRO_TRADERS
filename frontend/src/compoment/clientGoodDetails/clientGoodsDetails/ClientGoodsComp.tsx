"use client";

import { BeatLoader } from "react-spinners";
import { X } from "lucide-react";
import { AiFillCloseCircle, AiOutlinePlus } from "react-icons/ai";
import { useGetAllBrokerDetails } from "@/hook/brokerdetails";
import { useGetAllClientDetails } from "@/hook/clientdetails";
import { useGetAllCompanyDetails } from "@/hook/companydetails";
import { useGetSellerGoodsDetails } from "@/hook/sellergoodsdetails";

interface Package {
    package: string;
    weight: number;
    rate: number;
    calculation: string;
}

interface SellerPackage {
    packageId?: string;
    package: string;
}

interface SellerDetail {
    sellerId: string;
    sellerPackages: SellerPackage[];
}

interface Props {
    onClose: () => void;
    values: any;
    errors: any;
    touched: any;
    handleChange: any;
    handleBlur: any;
    handleSubmit: any;
    setFieldValue: any;
    isPending: boolean;
    mode: string;
}

export default function ClientGoodsComp({
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
        const newPackage = { package: "", weight: 0, rate: 0, calculation: "" };
        setFieldValue("packages", [...values.packages, newPackage]);
    };

    const addSeller = () => {
        const newSeller = { sellerId: "", sellerPackages: [{ packageId: "", package: "" }] };
        setFieldValue("sellersDetails", [...values.sellersDetails, newSeller]);
    };

    const removeSeller = (index: number) => {
        const updated = values.sellersDetails.filter((_: any, i: number) => i !== index);
        setFieldValue("sellersDetails", updated);
    };

    const removePackage = (index: number) => {
        const updated = values.packages.filter((_: any, i: number) => i !== index);
        setFieldValue("packages", updated);
    };


    const addSellerPackage = (sIndex: number) => {
        const newSellerPackage = { packageId: "", package: "" };
        const updatedSellers = [...values.sellersDetails];

        // push new package to the right seller
        updatedSellers[sIndex].sellerPackages = [
            ...updatedSellers[sIndex].sellerPackages,
            newSellerPackage,
        ];

        setFieldValue("sellersDetails", updatedSellers);
    };

    const removeSellerPackage = (sIndex: number, spIndex: number) => {
        const updatedSellers = [...values.sellersDetails];

        updatedSellers[sIndex].sellerPackages = updatedSellers[sIndex].sellerPackages.filter(
            (_: any, i: number) => i !== spIndex
        );

        setFieldValue("sellersDetails", updatedSellers);
    };
    const { data: brokers } = useGetAllBrokerDetails();

    const { data: client } = useGetAllClientDetails();
    const { data: company } = useGetAllCompanyDetails();
    const { data: sellerDetails } = useGetSellerGoodsDetails();

    // const { data: sellerpackage } = useGetSellerGoodsDetailsById(values.sellerDetails[0].sellerId);
    // console.log("🚀 ~ ClientGoodsComp ~ sellerpackage:", sellerpackage)

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

                <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 max-h-[80vh] overflow-y-auto">
                    <h1 className="text-2xl font-bold text-center text-orange-700 mb-6 underline underline-offset-8">
                        🕉️ {mode === "update" ? "Update Client Goods" : "Create Client Goods"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 border-none rounded-lg items-center">
                            {/* Client Id */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Client Name</label>
                                <select
                                    name="clientId"
                                    value={values.clientId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.clientId && touched.clientId ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">Select Client</option>
                                    {client?.data?.map((b, i) => (
                                        <option key={i} value={b._id}>
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Company Id */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Company Name</label>
                                <select
                                    name="companyId"
                                    value={values.companyId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.companyId && touched.companyId ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">Select Company</option>
                                    {company?.data?.map((b, i) => (
                                        <option key={i} value={b._id}>
                                            {b.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Vehicle Number */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Vehicle Number</label>
                                <input
                                    type="text"
                                    name="vehicleNumber"
                                    value={values.vehicleNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter vehicle number"
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.vehicleNumber && touched.vehicleNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Packages */}
                        <h2 className="text-xl font-semibold text-orange-700">Packages</h2>
                        {values.packages.map((pkg: Package, index: number) => (
                            <div className="flex gap-1" key={index}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Package"
                                        value={pkg.package}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].package`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300 ${errors.packages?.[index]?.package && touched.packages?.[index]?.package
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Weight"
                                        value={pkg.weight}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].weight`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300 ${errors.packages?.[index]?.weight && touched.packages?.[index]?.weight
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Rate"
                                        value={pkg.rate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].rate`}
                                        className={`px-3 py-2 border rounded-lg outline-none border-gray-300 ${errors.packages?.[index]?.rate && touched.packages?.[index]?.rate
                                            ? "border-red-500"
                                            : "border-gray-300"
                                            }`}
                                    />
                                    {/* <input
                                        type="text"
                                        placeholder="Calculation"
                                        value={pkg.calculation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`packages[${index}].calculation`}
                                        className="px-3 py-2 border rounded-lg outline-none border-gray-300"
                                    /> */}

                                    <select
                                        name={`packages[${index}].calculation`}
                                            value={pkg.calculation}
                                            onChange={handleChange}
                                            className={`w-full py-2 px-4 border rounded-lg outline-none text-gray-700  ${errors.packages?.[index]?.calculation && touched.packages?.[index]?.calculation ? "border-red-500" : "border-gray-300"
                                                }`}                                >
                                            <option value="">Select Cal. Method</option>
                                            <option value="Weight">Weight</option>
                                            <option value="Quantal">Quantal</option>
                                            
                                        </select>
                                </div>

                                {values.packages.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removePackage(index)}
                                    >
                                        <AiFillCloseCircle size={22} color="red" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add Package */}
                        <button
                            type="button"
                            onClick={addPackage}
                            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-2 py-2 rounded-lg transition"
                        >
                            <AiOutlinePlus size={20} /> Add Package
                        </button>

                        {/* Seller Details (basic setup) */}
                        <h2 className="text-xl font-semibold text-orange-700">Seller Details</h2>
                        {values.sellersDetails.map((seller: SellerDetail, sIndex: number) => {
                            const selectedSeller = sellerDetails?.data?.find(
                                (s: any) => s._id === seller.sellerId
                            );
                            return (

                                <div key={sIndex} className="border-none rounded-lg mb-3">
                                    <div className="flex gap-1 items-center mb-3">


                                        <select
                                            name={`sellersDetails[${sIndex}].sellerId`}
                                            value={seller.sellerId}
                                            onChange={handleChange}
                                            className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700  ${errors.sellersDetails?.[sIndex]?.sellerId && touched.sellersDetails?.[sIndex]?.sellerId ? "border-red-500" : "border-gray-300"
                                                }`}                                >
                                            <option value="">Select Seller</option>
                                            {sellerDetails?.data?.map((b: any, i: number) => (
                                                <option key={i} value={b._id}>
                                                    {b.name}, {b.address}
                                                </option>
                                            ))}
                                        </select>
                                        {values.sellersDetails.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSeller(sIndex)}
                                            >
                                                <AiFillCloseCircle size={22} color="red" />
                                            </button>
                                        )}
                                    </div>

                                    {/* <div cla> */}

                                    {seller.sellerPackages.map((sp, spIndex) => (

                                        <div className="flex gap-1 items-center  mb-2" key={spIndex}>

                                            <div className="grid grid-cols-2 gap-2">

                                                <select
                                                    name={`sellersDetails[${sIndex}].sellerPackages[${spIndex}].packageId`}
                                                    value={sp.packageId}
                                                    onChange={handleChange}
                                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 mb-3 ${errors.sellersDetails?.[sIndex]?.sellerPackages?.[spIndex]?.packageId && touched.sellersDetails?.[sIndex]?.sellerPackages?.[spIndex]?.packageId ? "border-red-500" : "border-gray-300"
                                                        }`}                            
                                                            >
                                                    <option value="">Select Package</option>
                                                    
                                                  {selectedSeller?.packages?.map((p: any, i: number) => (
                                                        <option key={i} value={p._id}>
                                                            {p.package} | Rate: {p.rate}
                                                        </option>
                                                    ))}
                                                </select>

                                                <input
                                                    type="text"
                                                    placeholder="Package"
                                                    value={sp.package}
                                                    name={`sellersDetails[${sIndex}].sellerPackages[${spIndex}].package`}
                                                    onChange={handleChange}
                                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.sellersDetails?.[sIndex]?.sellerPackages?.[spIndex]?.package && touched.sellersDetails?.[sIndex]?.sellerPackages?.[spIndex]?.package
                                                        ? "border-red-500"
                                                        : "border-gray-300"
                                                        }`}
                                                />



                                            </div>
                                            {seller.sellerPackages.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeSellerPackage(sIndex, spIndex)}
                                                >
                                                    <AiFillCloseCircle size={22} color="red" />
                                                </button>
                                            )}
                                        </div>

                                    ))}

                                    <button
                                        type="button"
                                        onClick={() => addSellerPackage(sIndex)}
                                        className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-2 py-2 rounded-lg transition"
                                    >
                                        <AiOutlinePlus size={20} /> Add Seller package
                                    </button>

                                </div>


                                // </div>
                            )
                        })}

                        <button
                            type="button"
                            onClick={addSeller}
                            className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-medium px-2 py-2 rounded-lg transition"
                        >
                            <AiOutlinePlus size={20} /> Add Seller
                        </button>

                        {/* Charges */}
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3  border-none rounded-lg items-center">

                            <div>
                                <label className="block font-medium">Miscellaneous Charge</label>
                                <input
                                    type="number"
                                    name="misleniousCharge"
                                    value={values.misleniousCharge}
                                    onChange={handleChange}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.misleniousCharge && touched.misleniousCharge
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                            </div>
                            <div>
                                <label className="block font-medium">Charge Description</label>
                                <input
                                    type="text"
                                    name="misleniousChargeDescription"
                                    value={values.misleniousChargeDescription || ""}
                                    onChange={handleChange}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.misleniousChargeDescription && touched.misleniousChargeDescription
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                            </div>
                        </div>


                        {/* Client Amount & Bill Number */}
                        <div className="grid grid-cols-2 gap-3 border-none rounded-lg items-center">
                            <div>
                                <label className="block font-medium">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.date && touched.date
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                            </div>

                            <div>
                                <label className="block font-medium">Bill Number</label>
                                <input
                                    type="text"
                                    name="billNumber"
                                    value={values.billNumber}
                                    onChange={handleChange}
                                    className={`w-full h-[42px] px-4 border rounded-lg outline-none text-gray-700 ${errors.billNumber && touched.billNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                        }`} />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                            >
                                {isPending ? (
                                    <BeatLoader size={8} color="white" />
                                ) : mode === "update" ? (
                                    "Update Goods"
                                ) : (
                                    "Add Goods"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
