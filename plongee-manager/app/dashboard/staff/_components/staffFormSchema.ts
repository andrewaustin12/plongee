import * as z from "zod";

export const staffFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  certLevel: z.string().min(1, {
    message: "Certification level is required.",
  }),
  staffType: z.string(),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
