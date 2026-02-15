import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Factory, ShieldCheck } from "lucide-react";

import { ApiError } from "@/shared/lib/api/error";
import {
  loginFormSchema,
  loginFormDefaultValues,
  type LoginFormValues,
} from "../schema/loginForm.schema";
import { useLogin } from "../hooks/useAuth";
import { LoginForm } from "../components/LoginForm";
import { useState } from "react";

export function LoginView() {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaultValues,
  });

  const loginMutation = useLogin();

  const handleSubmit = async (values: LoginFormValues) => {
    setServerError(null);

    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      handleSubmitError(error);
    }
  };

  const handleSubmitError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const apiError = ApiError.fromAxiosError(error);

      if (apiError.isValidationError && apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          form.setError(field as keyof LoginFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else if (apiError.isUnauthorized) {
        setServerError("Username atau password salah.");
      } else {
        setServerError(apiError.message || "Terjadi kesalahan pada server.");
      }
    } else {
      setServerError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — Decorative Background */}
      <div className="relative hidden w-[58%] overflow-hidden lg:block">
        {/* Gradient Background */}
        <div className="absolute inset-0 from-primary via-red-500/10 to-red-500/10" />

        {/* Geometric Pattern Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("/images/stm-bg.jpeg")`,
          }}
        />

        {/* Very Thin Red Overlay */}
        <div className="absolute inset-0 bg-red-500/10" />

        {/* Floating Abstract Shapes */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <img src="/images/logo-karoseri.png" alt="Logo" className="w-24" />
          </div>

          <div className="max-w-md space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Sistem Analisis
              <br />
              <span className="text-white/80">Kerusakan Karoseri</span>
            </h1>
            <p className="text-base leading-relaxed text-white/60">
              Platform cerdas untuk menganalisis, memprediksi, dan mengelola
              tingkat kerusakan komponen karoseri secara akurat dan efisien.
            </p>

            {/* <div className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm text-white/70">
                Data terenkripsi &amp; aman — akses terbatas untuk pengguna
                terotorisasi
              </span>
            </div> */}
          </div>

          {/* Footer */}
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Karoseri Frontend. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex flex-1 flex-col bg-background">
        {/* Mobile Brand Header */}
        <div className="flex items-center gap-2 p-6 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Factory className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold tracking-wide text-foreground">
            Karoseri
          </span>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center px-6 pb-12 pt-4 sm:px-12 lg:px-16">
          <div className="w-full max-w-[400px] space-y-8">
            {/* Heading */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Selamat Datang
              </h2>
              <p className="text-sm text-muted-foreground">
                Masukkan kredensial Anda untuk mengakses dashboard
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <LoginForm
                form={form}
                onSubmit={handleSubmit}
                isLoading={loginMutation.isPending}
                serverError={serverError}
              />
            </div>

            {/* Footer note — mobile only */}
            <p className="text-center text-xs text-muted-foreground/60 lg:hidden">
              &copy; {new Date().getFullYear()} Karoseri Frontend
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
