import {  clientGoodsDetailsSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import ClientGoodsComp from "../ClientGoodsComp";
import { useUpdateClientGood } from "@/hook/clientGoodsDetails";
import { ClientGoodsItemParams, UpdateClientGood } from "@/types/clientGoods/clientgoods";
import { useGetSellerGoodsDetails } from "@/hook/sellergoodsdetails";


interface Props {
    clientedit?: boolean
    clientGoodData: ClientGoodsItemParams
    //   paymentData:any
    onClose: () => void;
    onSuccess: () => void;
}
export default function UpdateClientGoods({ clientedit, clientGoodData, onClose, onSuccess }: Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateClientGood();
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
            clientId: clientGoodData.client._id,
            companyId: clientGoodData.company._id,
            vehicleNumber: clientGoodData.vehicleNumber,
            packages: clientGoodData.packages,
            sellersDetails: clientGoodData.sellersDetails,
            misleniousCharge: clientGoodData.misleniousCharge,
            misleniousChargeDescription: clientGoodData.misleniousChargeDescription ?? "",
            date: new Date(clientGoodData.date).toISOString().split("T")[0],
            billNumber: clientGoodData.billNumber
        },
        validationSchema: toFormikValidationSchema(clientGoodsDetailsSchema),
        validateOnChange: true,
        onSubmit: async (values) => {
            const payload: UpdateClientGood = {
                payload: {
                    clientId: values.clientId,
                    companyId: values.companyId,
                    vehicleNumber: values.vehicleNumber,
                    packages: values.packages,
                    sellersDetails: values.sellersDetails,
                    misleniousCharge: values.misleniousCharge,
                    misleniousChargeDescription: values.misleniousChargeDescription,
                    date: values.date,
                    billNumber: values.billNumber,
                },
                id: clientGoodData._id,
            };
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
            refetch();
        }

        if (isError && error) {
            toast.error(error.message ?? "Something went wrong!");
        }

    }, [isSuccess, isError, data, error, resetForm, onClose, onSuccess, refetch]);


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
            mode="update"
            clientedit={clientedit}
             sellerDetails={sellerDetails}


        /></div>)


}