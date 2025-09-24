import { Warehouse } from "lucide-react";
import { z } from "zod";

const initialLogin = {
  email: "",
  password: "",
};

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const initialRegister = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "", // include role
};

const initialBroker = {
  name: "",
  email: "",
  phone: "",
  paymentCalculation: "",
  paymentValue: 0,
};

const intialPayment = {
  amount: 0,
  date: "",
  paymentType: "Cash",
  chequeNumber: "",
  fromAccount: { accountHolderName: "", accountNumber: "", ifscCode: "" },
  toAccount: { accountHolderName: "", accountNumber: "", ifscCode: "" },
};

const initialCompany = {
  name: "",
  companyName: "",
  email: "",
  phone: [""],
  address: "",
  gst: "",
  pan: "",
};

const initialClient = {
  name: "",
  email: "",
  phone: [""],
  address: "",
  companyName: "",
};

const initailSellerGoods = {
  name: "",
  address: "",
  packages: [
    {
      package: "",
      weight: 0,
      rate: 0,
      date: "",
      commision: 0,
      broker: "",
      wareHouse:false,
    },
  ],
};
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string(), // include role
});

const updateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),

  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
  role: z.string(),
});

const createBrokerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  paymentCalculation: z.enum(["percentage", "fixed"], "Select payment type"),
  paymentValue: z.number().min(0, "Value must be >= 0"),
});

const accountSchema = z.object({
  accountHolderName: z
    .string()
    .min(1, "Account holder name is required")
    .optional(),
  accountNumber: z.string().min(1, "Account number is required").optional(),
  ifscCode: z.string().optional(),
});

const paymentSchema = z
  .object({
    amount: z.number().min(1, "Amount is required"),
    date: z.string().nonempty("Date is required"),
    paymentType: z.enum(["Cash", "Cheque", "BankTransfer", "PhonePe"]),
    chequeNumber: z.string().optional(),
    fromAccount: accountSchema.optional(), // ✅ optional at root
    toAccount: accountSchema.optional(), // ✅ optional at root
  })
  .superRefine((data, ctx) => {
    console.log("🚀 ~ validation data:", data);
    // ✅ If Cheque or BankTransfer → Cheque Number required
    if (data.paymentType === "Cheque" || data.paymentType === "BankTransfer") {
      if (!data.chequeNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cheque number is required",
          path: ["chequeNumber"],
        });
      }
    }

    // ✅ If NOT Cash → require fromAccount & toAccount
    if (data.paymentType !== "Cash") {
      if (
        !data.fromAccount ||
        !data.fromAccount.accountHolderName ||
        !data.fromAccount.accountNumber
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From account details are required",
          path: ["fromAccount"],
        });
      }
      if (!data.fromAccount?.accountHolderName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From account holder name is required",
          path: ["fromAccount", "accountHolderName"],
        });
      }

      if (!data.fromAccount?.accountNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From account number is required",
          path: ["fromAccount", "accountNumber"],
        });
      }
      if (
        !data.toAccount ||
        !data.toAccount.accountHolderName ||
        !data.toAccount.accountNumber
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "To account details are required",
          path: ["toAccount"],
        });
      }
      if (!data.toAccount?.accountHolderName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "To account holder name is required",
          path: ["toAccount", "accountHolderName"],
        });
      }
      if (!data.toAccount?.accountNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "To account number is required",
          path: ["toAccount", "accountNumber"],
        });
      }
    }

    // ✅ If BankTransfer → IFSC required
    if (data.paymentType === "BankTransfer") {
      if (!data.fromAccount?.ifscCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From account IFSC code is required for Bank Transfer",
          path: ["fromAccount", "ifscCode"],
        });
      }
      if (!data.toAccount?.ifscCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "To account IFSC code is required for Bank Transfer",
          path: ["toAccount", "ifscCode"],
        });
      }
    }
  });

const companySchema = z.object({
  name: z.string().min(2, "Name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.array(
    z
      .string()
      .length(10, { message: "Phone number must be exactly 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" })
  ),
  address: z.string().min(5, "Address is required"),
  gst: z.string().optional(),
  pan: z.string().optional(),
});

const clientSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.array(
    z
      .string()
      .length(10, { message: "Phone number must be exactly 10 digits" })
      .regex(/^\d+$/, { message: "Phone number must contain only digits" })
  ),
  address: z.string().min(5, "Address is required"),
  companyName: z.string().min(2, "Company name is required"),
});

const sellerGoodsSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters")
      .optional(),
    packages: z
      .array(
        z.object({
          package: z.string().min(1, "Package name is required"),
          weight: z.number().min(1, "Weight must be greater than 0"),
          rate: z.number().min(1, "Rate must be greater than 0"),
          date: z.string().min(1, "Date is required"), // could also use z.coerce.date()
          broker: z.string().min(1, "Broker is required"),
          commision: z.number().min(0, "Commission must be 0 or greater"),
          wareHouse:z.boolean(),
        })
      )
      .min(1, "At least one package is required"),
  })
  .refine((data) => data.name || data.address, {
    message: "Either name or address is required",
    path: ["name"], // 👈 attaches error to `name` (you could also use `address` or [] for form-level)
  });

export {
  initialLogin,
  loginSchema,
  initialRegister,
  registerSchema,
  updateSchema,
  initialBroker,
  createBrokerSchema,
  intialPayment,
  paymentSchema,
  initialCompany,
  companySchema,
  initialClient,
  clientSchema,
  initailSellerGoods,
  sellerGoodsSchema,
};
