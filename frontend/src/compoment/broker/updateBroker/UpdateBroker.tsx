"use client"
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {  createBrokerSchema } from "@/validation"; // Zod schema
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {  useUpdateBroker } from "@/hook/brokerdetails";
import BrokerComp from "../BrokerComp";
import {   UpdateBrokerType } from "@/types/brokerdetails/broker.param";
import { id } from "zod/locales";

interface Props{
    onClose:()=>void
    onSuccess:()=>void
    brokerData:UpdateBrokerType
}

export default function UpdateBroker({onClose,onSuccess,brokerData}:Props) {

    const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateBroker();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues:brokerData,
    validationSchema: toFormikValidationSchema(createBrokerSchema),
    onSubmit: async (values) => {
      try {
        const payData={...values}


        const payload = {
            id:brokerData.id,
            payload:payData
         };
        await mutateAsync(payload);
      } catch (err) {
        console.error("Error creating broker:", err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message ?? "Broker created successfully");
      resetForm();
      onClose();
      onSuccess();
    }

    if (isError) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  }, [isSuccess, isError, data, error, resetForm, onClose, onSuccess]);


    return <div>
        <BrokerComp onClose={onClose} values={values} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} handleSubmit={handleSubmit}
        isPending={isPending}
        mode="update"/>
    </div>;
}