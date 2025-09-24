"use client"
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { initialRegister, registerSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { RegisterParams } from "@/types/register/loginparam";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useRegister } from "@/hook/register";
import { ArrowLeft } from "lucide-react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { data, mutateAsync, isSuccess, isPending, isError, error } = useRegister();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialRegister,
    validationSchema: toFormikValidationSchema(registerSchema),
    onSubmit: async (values: RegisterParams) => {
      try {
        const payload: RegisterParams = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          role: values.role, // include role
        };
        await mutateAsync(payload);
      } catch (error) {
        console.error("Error during register:", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      toast.success(message ?? "Register successful !!");

      if (status === 200) {
        resetForm();
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
    <div className="min-h-screen bg-orange-50">
<button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-orange-700 hover:text-orange-900 font-semibold cursor-pointer p-4"
        >
          <ArrowLeft size={20} />
          Back
        </button>
    <div className="flex items-center justify-center ">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-orange-700 underline underline-offset-8 mb-6">
          🕉️ Jay Hanuman Agro Traders
        </h1>
         <h1 className="text-2xl font-bold text-center text-orange-400 ">
          Create User
        </h1>
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
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
    type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${
                errors.password && touched.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
             <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}  </button>
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
            {isPending ? <BeatLoader size={8} color="white" /> : "Register"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
