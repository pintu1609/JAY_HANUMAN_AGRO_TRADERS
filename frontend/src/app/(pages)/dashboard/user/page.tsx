"use client";
import React, { useState } from "react";
import { ArrowLeft, Pencil, Trash2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteRegisterUser, useGetAllUser } from "@/hook/register";
import { UserType } from "@/types/register/loginparam";
import { ClipLoader } from "react-spinners";
import UpdateUser from "@/compoment/user/UpdateUser/UpdateUser";

export default function User() {
  const router = useRouter();
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [userData, setUserData] = useState({});
  const { data, isLoading, isError, error, refetch } = useGetAllUser();
  const {mutateAsync ,isPending}=useDeleteRegisterUser(refetch);


  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {

    mutateAsync(id);
    }
    
  };

  const handleEdit = (user: UserType) => {
    setUserData(user);
    setOpenUpdateUser(true);
  };


  const users: UserType[] = data?.data || []; // adapt according to your API response
  console.log("🚀 ~ User ~ users:", users)

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
          User Management
        </h1>
        <button
          onClick={() => router.push("/dashboard/user/register")}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
        >
          <UserPlus size={18} /> Create User
        </button>
      </div>

      {/* User List */}
      {isLoading ? (
  <div className="flex justify-center py-6 items-center h-screen">
    <ClipLoader color="#36d7b7"  size={100}/>
  </div>
) : (
  // User List
  <div className="overflow-x-auto bg-white shadow rounded-lg">
    <table className="min-w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                    S.No
                                </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Email
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Phone
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
            Role
          </th>
          <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <tr key={user._id} className="border-t">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4 text-right space-x-3">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
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
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

)}
   
{
  openUpdateUser && <UpdateUser userData={userData as UserType} onClose={() => setOpenUpdateUser(false)} onSuccess={refetch} />
}

</div>



  );
}
