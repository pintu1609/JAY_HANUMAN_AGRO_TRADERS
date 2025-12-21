import PaymentDetailsForm from "@/compoment/PaymentComp/PaymentComp";
import {  paymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import {  useUpdateBrokerPayment } from "@/hook/brokerPayment";
import { useEffect } from "react";
import { PaymentItem } from "@/types/brokerdetails/broker.param";


interface Props {
    onClose: () => void;
    onSuccess: () => void;
    paymentdata: PaymentItem
}
export default function UpdateBrokerPayment({ onClose, onSuccess, paymentdata }: Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateBrokerPayment();

    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
        setFieldValue
    } = useFormik({
        initialValues: {
            amount: paymentdata.amount || 0,
            date: new Date(paymentdata.date).toISOString().split("T")[0] || "",
            paymentType: paymentdata.paymentType || "Cash",
            chequeNumber: paymentdata.chequeNumber || "",
            fromAccount: {
                accountHolderName: paymentdata.fromAccount?.accountHolderName || "",
                accountNumber: paymentdata.fromAccount?.accountNumber || "",
                ifscCode: paymentdata.fromAccount?.ifscCode || "",
            },
            toAccount: {
                accountHolderName: paymentdata.toAccount?.accountHolderName || "",
                accountNumber: paymentdata.toAccount?.accountNumber || "",
                ifscCode: paymentdata.toAccount?.ifscCode || "",
            }
        },
        validationSchema: toFormikValidationSchema(paymentSchema),
        validateOnChange: true,
        onSubmit: async (values) => {
            const payloadDta = { ...values, brokerId: paymentdata.brokerId };
            const payload = { id: paymentdata._id, payload: payloadDta }
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

    }, [isSuccess, isError, data, error, resetForm, onClose,onSuccess]);

    useEffect(() => {
        if (values.paymentType === "Cash") {
            setFieldValue("chequeNumber", "");
            setFieldValue("fromAccount", { accountHolderName: "", accountNumber: "", ifscCode: "" });
            setFieldValue("toAccount", { accountHolderName: "", accountNumber: "", ifscCode: "" });
        }
        // else if (values.paymentType === "Cheque" || values.paymentType === "PhonePe") {
        //     setFieldValue("fromAccount", { ifscCode: "" });
        //     setFieldValue("toAccount", { ifscCode: "" });
        // }
    }, [values.paymentType, setFieldValue]);


    return (

        <div><PaymentDetailsForm onClose={onClose}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isPending={isPending}
            mode="update"


        /></div>)
}