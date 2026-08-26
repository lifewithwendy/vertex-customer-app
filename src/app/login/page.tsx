"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/inquiries");
        }, 1000);
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="h-screen w-full bg-[#0a0a0c] p-2 sm:p-4 md:p-6 flex items-center justify-center font-sans antialiased text-neutral-900 overflow-hidden">
      <div className="w-full max-w-[1540px] h-full rounded-3xl overflow-hidden flex flex-col lg:flex-row bg-black shadow-2xl relative border border-neutral-800/40">

        {/* Glowing Aura Streams (Black, White & Orange Theme) - Moved to main container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Ambient Background Dark Radial */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(249,115,22,0.15),transparent_70%)]" />

          {/* Vertical Blurry Orange/White Light Pillars */}
          <div className="absolute -left-[5%] top-[-20%] w-48 sm:w-64 h-[150%] bg-gradient-to-b from-orange-600/35 via-amber-500/20 to-transparent blur-[80px] transform -rotate-12 animate-pulse duration-1000" />
          <div className="absolute left-[20%] top-[-10%] w-56 sm:w-72 h-[160%] bg-gradient-to-b from-orange-500/45 via-orange-600/25 to-black/90 blur-[95px] transform -rotate-6" />
          <div className="absolute left-[45%] top-[-25%] w-60 sm:w-80 h-[170%] bg-gradient-to-b from-orange-400/25 via-white/10 to-transparent blur-[110px]" />
          <div className="absolute left-[70%] top-[-15%] w-48 sm:w-64 h-[150%] bg-gradient-to-b from-orange-600/30 via-orange-800/20 to-black blur-[90px] transform rotate-6" />

          {/* Subtle Vignette & Grid Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* LEFT PANE - Brand Area */}
        <div className="relative z-10 lg:w-1/2 w-full h-72 lg:h-full p-6 sm:p-10 md:p-14 flex flex-col justify-between bg-transparent">

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <Image
              src="/vertex-icon.png"
              alt="Vertex Logistics Logo"
              width={48}
              height={48}
              className="object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-tight text-white">Vertex</span>
              <span className="text-[10px] font-medium tracking-[0.2em] text-orange-400 uppercase">Logistics</span>
            </div>
          </div>

          {/* Bottom Tagline */}
          <div className="relative z-10 max-w-lg mb-2 sm:mb-6">
            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18] text-white/95 tracking-tight font-sans">
              Where every journey meets <br className="hidden sm:inline" />
            </h1>
          </div>
        </div>

        {/* RIGHT PANE - Light Login Form Card */}
        <div className="relative z-10 lg:w-1/2 w-full flex-1 h-full p-2 sm:p-4 lg:p-6 flex">
          <div className="w-full h-full bg-[#f6f7f9] dark:bg-zinc-900 p-6 sm:p-12 lg:p-16 flex flex-col items-center justify-center rounded-2xl lg:rounded-3xl shadow-xl overflow-y-auto overflow-x-hidden">
            <div className="w-full max-w-[400px] space-y-8 my-auto py-4">

              {/* Form Title */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Welcome back to Vertex!
                </h2>
              </div>

              {isSuccess ? (
                <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl border border-neutral-200/80 dark:border-zinc-700 shadow-sm text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Successfully Logged In</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Redirecting to your dashboard...</p>
                  </div>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    className="rounded-full mt-2 text-xs bg-white dark:bg-zinc-700 border border-neutral-300 dark:border-zinc-600 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-zinc-600 shadow-none"
                  >
                    Sign in with another account
                  </Button>
                </div>
              ) : (
                /* Login Form */
                <form onSubmit={handleSubmit} className="space-y-6">

                  {error && (
                    <div className="flex items-center gap-3 p-3.5 text-sm text-red-600 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300 shadow-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                      <p className="font-medium tracking-tight">{error}</p>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-xs font-normal text-neutral-500 pl-1"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-full bg-[#efefef] dark:bg-zinc-800 border-transparent dark:border-zinc-700 px-5 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus-visible:bg-white dark:focus-visible:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-orange-500/70 focus-visible:border-orange-500/50 transition-all shadow-none"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <Label
                        htmlFor="password"
                        className="text-xs font-normal text-neutral-500"
                      >
                        Password
                      </Label>
                      <Link
                        href="#"
                        className="text-xs font-normal text-[#2b6cb0] hover:text-orange-600 transition-colors"
                      >
                        Forgot your password?
                      </Link>
                    </div>

                    <div className="relative flex items-center">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 w-full rounded-full bg-[#efefef] dark:bg-zinc-800 border-transparent dark:border-zinc-700 pl-5 pr-12 text-sm text-neutral-900 dark:text-neutral-100 focus-visible:bg-white dark:focus-visible:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-orange-500/70 focus-visible:border-orange-500/50 transition-all shadow-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 text-neutral-400 hover:text-neutral-700 transition-colors focus:outline-none p-1"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Log In Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full h-12 rounded-full font-medium text-sm transition-all duration-200 shadow-none ${isFormValid
                        ? "bg-neutral-900 hover:bg-orange-600 text-white shadow-md shadow-orange-500/10 cursor-pointer"
                        : "bg-[#dcdcdc] hover:bg-[#d5d5d5] text-neutral-400 cursor-not-allowed"
                        }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Logging in...</span>
                        </div>
                      ) : (
                        "Log in"
                      )}
                    </Button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
