import { z } from "zod";

/** Lead form contract — mirrors the NestJS CreateLeadDto. */
export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(16)
    .regex(/^[+0-9\s-]{10,16}$/, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Select a service"),
  propertyType: z.enum(["residential", "commercial", "industrial"], {
    errorMap: () => ({ message: "Select a property type" }),
  }),
  city: z.string().min(1).default("Bangalore"),
  locality: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.enum(["morning", "afternoon", "evening"]).optional(),
  message: z.string().max(1000).optional(),
  source: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadResponse extends LeadInput {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
