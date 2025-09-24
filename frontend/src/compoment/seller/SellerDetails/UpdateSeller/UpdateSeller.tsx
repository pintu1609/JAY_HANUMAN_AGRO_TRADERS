import { initailSellerGoods, sellerGoodsSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import {  useUpdateSellerGoods } from "@/hook/sellergoodsdetails";
import SellerGoodsComp from "../SellerComp";
import {  updateSellerParams } from "@/types/sellerDetails/sellerparam";


interface Props {
      sellerData:updateSellerParams
    onClose: () => void;
    onSuccess: () => void;
}
export default function UpdateSeller({sellerData,onClose,onSuccess}:Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateSellerGoods();

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
    initialValues: sellerData,
    validationSchema: toFormikValidationSchema(sellerGoodsSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
        const payload={
            payload:values,
            id:sellerData._id
        }
      try {
      
        mutateAsync(payload);
        
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
    
    <div><SellerGoodsComp onClose={onClose} 
    values={values}
    errors={errors}
    touched={touched}
    handleChange={handleChange}
    handleBlur={handleBlur}
    handleSubmit={handleSubmit}
    isPending={isPending}
setFieldValue={setFieldValue}    
    mode="update"
    
    
    /></div>)
   
    
}