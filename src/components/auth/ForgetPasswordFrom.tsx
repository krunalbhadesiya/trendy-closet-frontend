import { useForm, Controller, FormProvider, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// Define validation schemas
const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
})

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be 6 characters." }),
})

const newPasswordSchema = z.object({
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
})

// Define types for form data
type EmailFormData = z.infer<typeof emailSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

// Component definition
export function ForgetPasswordForm() {
  const [step, setStep] = useState(1);
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });
  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });
  const newPasswordForm = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  // Define handlers with specific types
  const handleEmailSubmit: SubmitHandler<EmailFormData> = (data) => {
    console.log("Email submitted:", data.email);
    setStep(2);
  };

  const handleOtpSubmit: SubmitHandler<OtpFormData> = (data) => {
    console.log("OTP submitted:", data.otp);
    setStep(3);
  };

  const handleNewPasswordSubmit: SubmitHandler<NewPasswordFormData> = (data) => {
    console.log("New password submitted:", data.newPassword);
  };

  return (
    <FormProvider {...emailForm} {...otpForm} {...newPasswordForm}>
      {step === 1 && (
        <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-8">
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Controller
                name="email"
                control={emailForm.control}
                render={({ field }) => <Input type="email" placeholder="Your email" {...field} />}
              />
            </FormControl>
            <FormDescription>
              We will send a verification code to this email address.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <Button type="submit">Send OTP</Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-8">
          <FormItem>
            <FormLabel>OTP</FormLabel>
            <FormControl>
              <Controller
                name="otp"
                control={otpForm.control}
                render={({ field }) => <Input type="text" placeholder="Enter OTP" {...field} />}
              />
            </FormControl>
            <FormDescription>
              Enter the OTP sent to your email.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <Button type="submit">Verify OTP</Button>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={newPasswordForm.handleSubmit(handleNewPasswordSubmit)} className="space-y-8">
          <FormItem>
            <FormLabel>New Password</FormLabel>
            <FormControl>
              <Controller
                name="newPassword"
                control={newPasswordForm.control}
                render={({ field }) => <Input type="password" placeholder="New password" {...field} />}
              />
            </FormControl>
            <FormDescription>
              Enter your new password.
            </FormDescription>
            <FormMessage />
          </FormItem>
          <Button type="submit">Set New Password</Button>
        </form>
      )}
    </FormProvider>
  );
}
