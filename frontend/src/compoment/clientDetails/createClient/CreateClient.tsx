import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  initialClient,
  clientSchema
} from "@/validation";
import { useFormik } from "formik";
import ClientDetailsComp from "../ClientDetailsComp";
import { useCreateClient } from "@/hook/clientdetails";


interface Props {
  onClose: () => void
  onSuccess: () => void
}
export default function CreateClient({ onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateClient();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue
  } = useFormik({
    initialValues: initialClient,
    validationSchema: toFormikValidationSchema(clientSchema),
    onSubmit: async (values) => {
      try {
        const payload = { ...values };
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

  const addPhone = () => {
    setFieldValue("phone", [...values.phone, ""]);
  };

  const removePhone = (index: number) => {
    const updated = values.phone.filter((_: string, i: number) => i !== index);
    setFieldValue("phone", updated);
  };
  return (
    <div>
      <ClientDetailsComp
        onClose={onClose} values={values} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} handleSubmit={handleSubmit}
        isPending={isPending}
        mode="create"
        addPhone={addPhone}
        removePhone={removePhone}
      />

    </div>
  )
}