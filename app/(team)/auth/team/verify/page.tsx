"use client";
import { OTPForm } from "./otp-form";
import { useSearchParams } from "next/navigation";

export default function OTPPage({ email }: { email: string }) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm email={email} />
      </div>
    </div>
  );
}
