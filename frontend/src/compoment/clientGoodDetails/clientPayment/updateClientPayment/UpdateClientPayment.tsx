import { clientPaymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUpdateClientPayment } from "@/hook/clientpayment";
import ClientPaymentDetailsForm from "../ClientPaymentComp";
import { ClientPaymentItemParams } from "@/types/clientGoods/cientpayment";


interface Props {
  clientedit?: boolean
  clientId?: string
  clientPaymentData: ClientPaymentItemParams
  onClose: () => void;
  onSuccess: () => void;
}
export default function UpdateClientPayment({ clientedit, clientId, clientPaymentData, onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateClientPayment();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      clientId: clientId ?? "",
      amount: clientPaymentData.amount ?? 0,
      date: new Date(clientPaymentData.date).toISOString().split("T")[0] || "",
      paymentType: clientPaymentData.paymentType ?? "Cash",
      chequeNumber: clientPaymentData.chequeNumber || "",
      accountNumber: clientPaymentData.accountNumber || "",

    },
    validationSchema: toFormikValidationSchema(clientPaymentSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const payLoadData = { ...values }
      const payload = {
        payload: payLoadData,
        id: clientPaymentData._id ?? ""
      };

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

  useEffect(() => {
    if (values.paymentType === "Cash") {
      setFieldValue("chequeNumber", "");
      setFieldValue("accountNumber", "");
    }
    if (values.paymentType === "PhonePe" || values.paymentType === "BankTransfer") {
      setFieldValue("chequeNumber", "");
    }

  }, [values.paymentType]);
  return (

    <div><ClientPaymentDetailsForm onClose={onClose}
      values={values}
      errors={errors}
      touched={touched}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      isPending={isPending}
      mode="update"
      clientedit={clientedit}


    /></div>)
}