import { initialClientGoodsDetails, clientGoodsDetailsSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import ClientGoodsComp from "../ClientGoodsComp";
import { useCreateClientGood } from "@/hook/clientGoodsDetails";


interface Props {
    //   paymentData:any
    onClose: () => void;
    onSuccess: () => void;
}
export default function CreateClientGoods({onClose,onSuccess}:Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateClientGood();

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
    initialValues: initialClientGoodsDetails,
    validationSchema: toFormikValidationSchema(clientGoodsDetailsSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
      
        mutateAsync(values);
        
      } catch (err) {
        toast.error("Something went wrong!");
      }
    },
  });
    console.log("🚀 ~ CreateSeller ~ errors:", errors)
    console.log("🚀 ~ CreateSeller ~ values:", values)
   
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
    
    <div><ClientGoodsComp onClose={onClose} 
    values={values}
    errors={errors}
    touched={touched}
    handleChange={handleChange}
    handleBlur={handleBlur}
    handleSubmit={handleSubmit}
    isPending={isPending}
setFieldValue={setFieldValue}    
    mode="create"
    
    
    /></div>)
   
    
}