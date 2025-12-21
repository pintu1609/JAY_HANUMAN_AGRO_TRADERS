import { initailSellerGoods, sellerGoodsSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useCreateSellerGood } from "@/hook/sellergoodsdetails";
import SellerGoodsComp from "../SellerComp";


interface Props {
  //   paymentData:any
  onClose: () => void;
  onSuccess: () => void;
}
export default function CreateSeller({ onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateSellerGood();

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
    initialValues: initailSellerGoods,
    validationSchema: toFormikValidationSchema(sellerGoodsSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {

        mutateAsync(values);

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

    <div><SellerGoodsComp onClose={onClose}
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