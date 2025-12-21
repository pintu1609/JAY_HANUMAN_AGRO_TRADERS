"use client";
import React, { useState } from "react";
import { ArrowLeft, Pencil, Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useDeleteRegisterUser, useGetAllUser } from "@/hook/register";
import { ClipLoader } from "react-spinners";
// import UpdateUser from "@/compoment/user/UpdateUser/UpdateUser";
import { useDeleteCompanyDetails, useGetAllCompanyDetails } from "@/hook/companydetails";
import { CompanyDetailsType } from "@/types/companydetails/companyparam";
import CreateCompany from "@/compoment/companyDetails/createCompany/CreateCompany";
import UpdateCompany from "@/compoment/companyDetails/updateCompany/UpdateCompany";

export default function User() {
    const router = useRouter();

    const [openCreateComapny, setOpenCreateComapny] = useState(false)
    const [openUpdateCompany, setOpenUpdateCompany] = useState(false)
    const [updateCompanyData, setUpdateCompanyData] = useState<null | CompanyDetailsType>(null)

    const { data, isLoading, refetch } = useGetAllCompanyDetails();
    const { mutateAsync, isPending } = useDeleteCompanyDetails(refetch);


    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this Company Details?")) {

            mutateAsync(id);
        }

    };

    const handleCreateCompany = () => {
        setOpenCreateComapny(true)
    }

    const handleUpdateCompany = (data: CompanyDetailsType) => {
        setUpdateCompanyData(data)
        setOpenUpdateCompany(true)

    };


    const companyData: CompanyDetailsType[] = data?.data || []; // adapt according to your API response

    return (
        <div className="p-6 bg-orange-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-2xl font-bold text-orange-700">
                    Company Details Management
                </h1>
                <button
                    onClick={() => handleCreateCompany()}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
                >
                    <UserPlus size={18} /> Add Company
                </button>
            </div>

            {/* User List */}
            {isLoading ? (
                <div className="flex justify-center py-6 items-center h-screen">
                    <ClipLoader color="#36d7b7" size={100} />
                </div>
            ) : (
                // User List
                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 border-r">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    Company Name
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    Phone
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    address
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    GST No.
                                </th>
                                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600 border-r">
                                    Pan No.
                                </th>
                                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600 " >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyData.length > 0 ? (
                                companyData.map((com, index) => (
                                    <tr key={com._id} className="border-t">
                                        <td className="px-6 py-4 border-r">{index + 1}</td>
                                        <td className="px-6 py-4 border-r">{com.name ? com.name : "-"}</td>
                                        <td className="px-6 py-4 border-r">{com.companyName ? com.companyName : "-"}</td>

                                        <td className="px-6 py-4 border-r">{com.email ? com.email : "-"}</td>
                                        <td className="px-6 py-4 border-r">
                                            {com.phone?.map((phone, index) => (

                                                <span key={index}>
                                                    {phone}
                                                    {index !== com.phone.length - 1 && ", "}
                                                </span>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 border-r">{com.address}</td>
                                        <td className="px-6 py-4  border-r">{com.gst ? com.gst : "-"}</td>
                                        <td className="px-6 py-4 border-r">{com.pan ? com.pan : "-"}</td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => handleUpdateCompany(com)}
                                                className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(com._id)}
                                                className={`text-red-600 hover:text-red-800 cursor-pointer ${isPending ? 'cursor-not-allowed' : ''}`}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-gray-500 py-6">
                                        There is not any Company yet, please Create a Company
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            )}
            {openCreateComapny &&
                <CreateCompany onClose={() => setOpenCreateComapny(false)} onSuccess={refetch} />
            }

            {
                openUpdateCompany && updateCompanyData && <UpdateCompany onClose={() => setOpenUpdateCompany(false)} onSuccess={refetch} updateCompanyData={updateCompanyData} />
            }

        </div>



    );
}
