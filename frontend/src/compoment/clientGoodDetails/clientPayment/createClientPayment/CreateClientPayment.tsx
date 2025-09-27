import PaymentDetailsForm from "@/compoment/PaymentComp/PaymentComp";
import { intialClientPayment, clientPaymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useCreateSellerPayment } from "@/hook/sellerpayment";
import { useCreateClientPayment } from "@/hook/clientpayment";
import ClientPaymentDetailsForm from "../ClientPaymentComp";


interface Props {
    clientedit?:boolean
      clientId?:string
    onClose: () => void;
    onSuccess: () => void;
}
export default function CreateClientPayment({clientedit,clientId,onClose,onSuccess}:Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateClientPayment();

      const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {...intialClientPayment,
      clientId:clientId ?? ""
    },
    validationSchema: toFormikValidationSchema(clientPaymentSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
        // const payload = { ...values ,};
      try {
      
        mutateAsync(values);
        
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

  
    return(
    
    <div><ClientPaymentDetailsForm onClose={onClose} 
    values={values}
    errors={errors}
    touched={touched}
    handleChange={handleChange}
    handleBlur={handleBlur}
    handleSubmit={handleSubmit}
    isPending={isPending}
    mode="create"
    clientedit={clientedit}
    
    
    /></div>)
}