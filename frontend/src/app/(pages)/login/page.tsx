"use client"
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { initialLogin, loginSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useLogin } from "@/hook/register";
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { ZodError } from "zod";
import { BeatLoader } from "react-spinners";
import { LoginParams } from "@/types/register/loginparam";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();
  const {
    data,
    mutateAsync,
    isPending,
    isSuccess,
    isError,
    error,
  } = useLogin();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialLogin,
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      const payload: LoginParams = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await mutateAsync(payload);
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  });


  useEffect(() => {
    if (isSuccess && data) {
      const { status, message } = data;
      toast.success(message ?? "Login successful !!");

      if (status === 200) {
        resetForm();
        localStorage.setItem('accessToken', data?.token)
        localStorage.setItem('name', data?.data?.name)
        router.push("/dashboard");
      }
    }

    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);

      } else if (error instanceof ZodError) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
        console.log("Error:", error);

      }



    }
  }, [isSuccess, isError, data, error, resetForm]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-orange-700 mb-6">
          🕉️ Jay Hanuman Agro Traders
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email" // ✅ added
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg  outline-none ${errors.email && touched.email ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your email"
            />

          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password" // ✅ added
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-lg outline-none ${errors.password && touched.password ? "border-red-500" : "border-gray-300"
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

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition duration-200 cursor-pointer"
          >
            {
              isPending ? <BeatLoader size={8} color="white" /> :
                "Login"
            }
          </button>
        </form>
      </div>
    </div>
  );
}
