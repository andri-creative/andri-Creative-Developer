// app/(team)/auth/team/verify/otp-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/app/services/authService";

export function OTPForm({
  email,
  ...props
}: { email: string } & React.ComponentProps<typeof Card>) {
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const result = await authService.verifyOtp({ email, otp });

      if (!result.success) {
        setErrorMsg(result.message || "OTP tidak valid");
        return;
      }

      setSuccessMsg("OTP berhasil diverifikasi, akun aktif!");
      setTimeout(() => {
        router.push("/auth/team/login");
      }, 2000);
    } catch (err) {
      setErrorMsg("Terjadi kesalahan saat verifikasi");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const result = await authService.resendOtp(email);

      if (result.success) {
        setSuccessMsg("OTP berhasil dikirim ulang!");
      } else {
        setErrorMsg(result.message || "Gagal mengirim ulang OTP");
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan saat mengirim ulang OTP");
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP
                maxLength={6}
                id="otp"
                value={otp}
                onChange={(val) => setOtp(val)}
                required
              >
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-500 text-sm">{successMsg}</p>
            )}

            <FieldGroup>
              <Button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <FieldDescription className="text-center">
                Didn&apos;t receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-500 hover:underline"
                >
                  Resend
                </button>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
