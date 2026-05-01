"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/app/libs/supabase";
import { useUserStore } from "@/store/useUserStore";
import GoogleOAuthButton from "@/components/GoogleOAuthButton";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const InputField = ({ label, error, className, ...props }: InputFieldProps) => {
  return (
    <div className={className || "col-span-full w-full"}>
      <label
        htmlFor={props.id || props.name}
        className="mb-1 block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          id={props.id || props.name}
          className={`block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset outline-none transition-all duration-200 sm:text-sm sm:leading-6 ${
            error
              ? "bg-red-50/30 pr-10 ring-red-500 focus:ring-2 focus:ring-red-500"
              : "bg-white/80 ring-gray-300 backdrop-blur-sm hover:ring-gray-400 focus:ring-2 focus:ring-indigo-600"
          }`}
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserStore();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notification, setNotification] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("error") === "oauth") {
      setNotification({
        type: "error",
        message: "Google sign-in failed. Please try again.",
      });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (notification?.type === "error") {
      setNotification(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setNotification(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setNotification({ type: "error", message: "Invalid email or password." });
        return;
      }

      if (data.session) {
        setUser(data.user);
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      setNotification({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during login.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md sm:max-w-lg">
      <Link
        href="/"
        className="group mb-6 flex w-fit items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
      >
        <svg
          className="h-4 w-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to home
      </Link>

      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>

      <AnimatePresence mode="wait">
        {notification && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm font-medium ${
              notification.type === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-green-200 bg-green-50 text-green-800"
            }`}
          >
            {notification.type === "error" ? (
              <svg
                className="h-5 w-5 shrink-0 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 shrink-0 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5">
        <GoogleOAuthButton
          label="Log in with Google"
          onError={(message) =>
            setNotification({ type: "error", message })
          }
        />
      </div>

      <div className="relative mb-6 mt-6 flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-4 text-sm font-medium text-gray-500">
          or log in with email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <InputField
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="jane@company.com"
        />

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <Link
              href="/reset"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`block w-full rounded-xl border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset outline-none transition-all duration-200 sm:text-sm sm:leading-6 ${
                errors.password
                  ? "bg-red-50/30 pr-10 ring-red-500 focus:ring-2 focus:ring-red-500"
                  : "bg-white/80 ring-gray-300 backdrop-blur-sm hover:ring-gray-400 focus:ring-2 focus:ring-indigo-600"
              }`}
            />
            <AnimatePresence>
              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:-translate-y-0"
          >
            {isLoading ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
