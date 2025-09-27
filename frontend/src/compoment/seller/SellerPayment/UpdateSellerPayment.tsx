import PaymentDetailsForm from "@/compoment/PaymentComp/PaymentComp";
import { intialPayment, paymentSchema } from "@/validation";
import { toFormikValidationSchema } from "zod-formik-adapter";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useUpdateSellerPayment } from "@/hook/sellerpayment";
import { PaymentItem } from "@/types/sellerDetails/sellerparam";


interface Props {
    paymentdata: PaymentItem
    onClose: () => void;
    onSuccess: () => void;
}
export default function UpdateSellerPayment({ paymentdata, onClose, onSuccess }: Props) {
    const { mutateAsync, isPending, isSuccess, isError, data, error } = useUpdateSellerPayment();

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
                accountHolderName: paymentdata?.fromAccount?.accountHolderName || "",
                accountNumber: paymentdata?.fromAccount?.accountNumber || "",
                ifscCode: paymentdata?.fromAccount?.ifscCode || "",
            },
            toAccount: {
                accountHolderName: paymentdata?.toAccount?.accountHolderName || "",
                accountNumber: paymentdata?.toAccount?.accountNumber || "",
                ifscCode: paymentdata.toAccount?.ifscCode || "",
            }
        },
        validationSchema: toFormikValidationSchema(paymentSchema),
        validateOnChange: true,
        onSubmit: async (values) => {
            const payloadDta = { ...values, sellerId: paymentdata.sellerId };
            const payload = { id: paymentdata._id, payload: payloadDta }
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
            setFieldValue("fromAccount", { accountHolderName: "", accountNumber: "", ifscCode: "" });
            setFieldValue("toAccount", { accountHolderName: "", accountNumber: "", ifscCode: "" });
        }

    }, [values.paymentType]);


    return (

        <div>
            <PaymentDetailsForm onClose={onClose}
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