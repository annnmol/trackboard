import { z, ZodTypeAny } from "zod";

//============= Sign IN =============
export const SignInValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignInValidator = z.infer<typeof SignInValidator>;

export const signInIntialValues = {
  email: "anmol@a.com",
  password: "",
};

//============= Sign UP =============
export const SignUpValidator = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export type TSignUpValidator = z.infer<typeof SignUpValidator>;

export const signUpIntialValues = {
  fullName: "Anmol",
  email: "a@a.com",
  password: "",
};

//============= Forget Password =============
export const ForgetPasswordValidator = z.object({
  email: z.string().email(),
});

export type TForgetPasswordValidator = z.infer<typeof ForgetPasswordValidator>;

export const forgetPasswordIntialValues = {
  email: "",
};

//============= Change Password =============
export const ChangePasswordValidator = z
  .object({
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // path of error
  });

export type TChangePasswordValidator = z.infer<typeof ChangePasswordValidator>;

export const changePasswordIntialValues = {
  password: "",
  confirm: "",
};


//============= Email =============

export const emailSchema = z.string().email();


//============= Create List =============
export const CreateListValidator = z.object({
  title: z.string().min(1).max(40),
});

export const createListIntialValues:TCreateListValidator = {
  title: "",
};

export type TCreateListValidator = z.infer<typeof CreateListValidator>;

//============= Create Task =============
export const CreateTaskValidator = z.object({
  title: z.string().min(1).max(40),
  description: z.string().min(1).max(500).default(""),
  dueDate: z.date({
    required_error: "Duedate is required.",
  }).default(new Date()),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  listId: z.string().min(1).default(""),
});

export const createTaskIntialValues:TCreateTaskValidator = {
  title: "New Task",
  description: "description",
  dueDate: new Date(),
  priority: "medium",
  listId: "",
};

export type TCreateTaskValidator = z.infer<typeof CreateTaskValidator>;
