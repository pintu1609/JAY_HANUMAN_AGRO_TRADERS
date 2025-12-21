import PaymentDetailsForm from "@/compoment/PaymentComp/PaymentComp";
import { intialPayment, paymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useCreateBrokerPayment } from "@/hook/brokerPayment";
import { useEffect } from "react";


interface Props {
  onClose: () => void;
  brokerId: string
  onSuccess: () => void;
}
export default function CreateBrokerPayment({ onClose, brokerId, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateBrokerPayment();

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
      const payload = { ...values, brokerId: brokerId };
      try {

        mutateAsync(payload);

      } catch (err) {
        console.log(err);
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

  }, [isSuccess, isError, data, error, resetForm, onClose, onSuccess]);


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