"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarCheck, ShieldCheck } from "lucide-react";
import { PRIMARY_CITY } from "@pestosot/config";
import { leadSchema, type LeadInput } from "@/lib/types";
import { submitLead, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input, Label, Select, Textarea, FieldError } from "@/components/ui/field";

const SERVICE_OPTIONS = [
  { value: "pest-control", label: "General Pest Control" },
  { value: "cockroach-control", label: "Cockroach Control" },
  { value: "termite-control", label: "Termite Control" },
  { value: "rodent-control", label: "Rodent Control" },
  { value: "bed-bug-control", label: "Bed Bug Control" },
  { value: "mosquito-control", label: "Mosquito Control" },
  { value: "deep-cleaning", label: "Deep Cleaning" },
  { value: "sofa-cleaning", label: "Sofa / Upholstery Cleaning" },
  { value: "kitchen-deep-cleaning", label: "Kitchen Deep Cleaning" },
  { value: "amc", label: "Annual Maintenance (AMC)" },
  { value: "other", label: "Something else" },
];

const PROPERTY_TYPES = [
  { value: "residential", label: "Home / Apartment" },
  { value: "commercial", label: "Office / Shop" },
  { value: "industrial", label: "Factory / Warehouse" },
] as const;

export function LeadForm({
  presetService,
  onSuccess,
  compact,
}: {
  presetService?: string;
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      city: PRIMARY_CITY.name,
      serviceType: presetService ?? "",
      propertyType: undefined,
      source: "website-homepage",
    },
  });

  const propertyType = watch("propertyType");

  async function next() {
    const valid = await trigger(["serviceType", "propertyType"]);
    if (valid) setStep(1);
  }

  async function onSubmit(data: LeadInput) {
    setServerError(null);
    try {
      await submitLead(data);
      onSuccess?.();
      router.push("/thank-you");
    } catch (err) {
      setServerError(
        err instanceof ApiError ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className={compact ? "" : "p-6 sm:p-8"}>
      {!compact && (
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
            <CalendarCheck className="size-3.5" /> Free Inspection
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold text-navy-900">
            Book your free inspection
          </h3>
          <p className="mt-1 text-sm text-ink-500">
            Tell us what you need — we&apos;ll call within {`2 hours`} to confirm.
          </p>
        </div>
      )}

      {/* Progress */}
      <div className="mb-6 flex items-center gap-2">
        {[0, 1].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              s <= step ? "bg-primary-600" : "bg-ink-200"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 ? (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="serviceType" required>
                  What service do you need?
                </Label>
                <Select id="serviceType" invalid={!!errors.serviceType} {...register("serviceType")}>
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
                <FieldError>{errors.serviceType?.message}</FieldError>
              </div>

              <div>
                <Label required>Property type</Label>
                <div className="grid grid-cols-3 gap-2">
                  {PROPERTY_TYPES.map((p) => (
                    <button
                      type="button"
                      key={p.value}
                      onClick={() =>
                        setValue("propertyType", p.value, { shouldValidate: true })
                      }
                      className={`rounded-xl border px-2 py-3 text-xs font-medium transition-all ${
                        propertyType === p.value
                          ? "border-primary-500 bg-primary-50 text-primary-700 shadow-soft"
                          : "border-ink-200 text-ink-600 hover:border-ink-300"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <FieldError>{errors.propertyType?.message}</FieldError>
              </div>

              <Button type="button" size="lg" className="w-full" onClick={next}>
                Continue <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="name" required>
                  Full name
                </Label>
                <Input id="name" placeholder="e.g. Ananya Rao" invalid={!!errors.name} {...register("name")} />
                <FieldError>{errors.name?.message}</FieldError>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="phone" required>
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 90000 00000"
                    invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  <FieldError>{errors.phone?.message}</FieldError>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    invalid={!!errors.email}
                    {...register("email")}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="locality">Locality</Label>
                  <Select id="locality" {...register("locality")}>
                    <option value="">Select area</option>
                    {PRIMARY_CITY.localities.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred time</Label>
                  <Select id="preferredTime" {...register("preferredTime")}>
                    <option value="">Any time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="message">Anything we should know?</Label>
                <Textarea
                  id="message"
                  rows={3}
                  placeholder="Describe the problem, severity, or preferred date…"
                  {...register("message")}
                />
              </div>

              {serverError && (
                <p className="rounded-lg bg-danger-500/10 px-3 py-2 text-sm font-medium text-danger-500">
                  {serverError}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(0)}
                  className="px-4"
                >
                  <ArrowLeft className="size-4" />
                </Button>
                <Button type="submit" size="lg" loading={isSubmitting} className="flex-1">
                  Book Free Inspection
                </Button>
              </div>

              <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-ink-400">
                <ShieldCheck className="size-3.5 text-primary-500" />
                Your details are safe. No spam, ever.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
