import { initialClientGoodsDetails, clientGoodsDetailsSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import ClientGoodsComp from "../ClientGoodsComp";
import { useCreateClientGood } from "@/hook/clientGoodsDetails";
import { useGetSellerGoodsDetails } from "@/hook/sellergoodsdetails";


interface Props {
  //   paymentData:any
  clientedit?: boolean
  clientId?: string | undefined
  onClose: () => void;
  onSuccess: () => void;
}
export default function CreateClientGoods({ clientedit, clientId, onClose, onSuccess }: Props) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } = useCreateClientGood();
      const { data: sellerDetails, refetch } = useGetSellerGoodsDetails();


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
      ...initialClientGoodsDetails,
      clientId: clientId ?? ""
    },
    validationSchema: toFormikValidationSchema(clientGoodsDetailsSchema),
    validateOnChange: true,
    enableReinitialize: true,
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
      refetch();
    }

    if (isError && error) {
      toast.error(error.message ?? "Something went wrong!");
    }

  }, [isSuccess, isError, data, error, resetForm, onClose,onSuccess,refetch]);


  return (

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
      clientedit={clientedit}
      sellerDetails={sellerDetails}


    /></div>)


}