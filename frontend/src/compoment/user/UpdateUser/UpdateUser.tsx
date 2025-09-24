"use client"
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { updateSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { RegisterParams, updateUserParams, UpdateUserType, UserType } from "@/types/register/loginparam";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import {  useUpdateRegisterUser } from "@/hook/register";
import { X } from "lucide-react";

interface Props {
userData:UserType
  onClose: () => void;
  onSuccess: () => void;
}

export default function UpdateUser({userData, onClose,onSuccess}:Props) {
  const router = useRouter();

  const { data, mutateAsync, isSuccess, isPending, isError, error } = useUpdateRegisterUser();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
   initialValues: userData as UpdateUserType || {
  name: userData.name,
  email: userData.email,
  phone: userData.phone || "",
  password:  "",
  role: userData.role,
},
    validationSchema: toFormikValidationSchema(updateSchema),
    onSubmit: async (values: updateUserParams) => {
      try {
        const payloadData: updateUserParams = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values?.password,
          role: values.role,
        };
        const payload = {
          data: payloadData,
          id: userData._id,
        };

        await mutateAsync(payload);
      } catch (error) {
        console.error("Error during register:", error);
      }
    },
  });
    console.log("🚀 ~ UpdateUser ~ errors:", errors)
    console.log("🚀 ~ UpdateUser ~ values:", values)

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      toast.success(message ?? "Register successful !!");

      if (status === 200) {
        resetForm();
        onClose();
        onSuccess();
      }
    }

    if (isError) {
      console.log("🚀 ~ Register ~ isError:", isError)
      if (error instanceof AxiosError) {
        console.log("🚀 ~ Register ~ AxiosError:", AxiosError)
        console.log("🚀 ~ Register ~ error:", error)
        toast.error(error?.response?.data?.message);
      } else if (error instanceof ZodError) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, isError, data, error, resetForm, router]);

  return (
        <div className="fixed  inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className=" bg-white rounded-2xl shadow-lg w-full max-w-md flex items-center justify-center z-50 p-8">

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-400 hover:text-red-600 cursor-pointer" 
        >
          <X size={25} />
        </button>
        <h2 className="text-3xl font-bold text-orange-700 mb-4 text-center underline underline-offset-8">Update User</h2>

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
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.name && touched.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
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
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.email && touched.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone No.</label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.password && touched.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.role && touched.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
          >
            {isPending ? <BeatLoader size={8} color="white" /> : "Update User"}
          </button>
        </form>
        </div>
      </div>
      </div>
  );
}
