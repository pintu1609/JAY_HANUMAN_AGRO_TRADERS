import PaymentDetailsForm from "@/compoment/PaymentComp/PaymentComp";
import { intialPayment, paymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useCreateSellerPayment } from "@/hook/sellerpayment";


interface Props {
  paymentData: any
  onClose: () => void;
  onSuccess: () => void;
}
export default function CreateSellerPayment({ paymentData, onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateSellerPayment();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: intialPayment,
    validationSchema: toFormikValidationSchema(paymentSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const payload = { ...values, sellerId: paymentData.sellerId };
      try {

        mutateAsync(payload);

      } catch (err) {
        toast.error("Something went wrong!");
      }
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      toast.success(data.message ?? "Broker payment created successfully");
      resetForm();
      onClose();
      onSuccess();
    }

    if (isError && error) {
      toast.error(error.message ?? "Something went wrong!");
    }

  }, [isSuccess, isError, data, error, resetForm, onClose]);


  return (

    <div><PaymentDetailsForm onClose={onClose}
      values={values}
      errors={errors}
      touched={touched}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      isPending={isPending}
      mode="create"


    /></div>)
}