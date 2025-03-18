/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

export default function Verify() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Invalid verification link");
      router.push("/login");
      return;
    }

    verifyEmail();
  }, [token, router]);

  const verifyEmail = async () => {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error("Failed to verify email");
      }

      setIsSuccess(true);
      toast.success("Email verified successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verification failed"
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Food Delvo"
            width={48}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {isVerifying ? (
              <div>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Verifying your email...</p>
              </div>
            ) : isSuccess ? (
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
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
                </div>
                <p className="mt-4 text-lg font-medium text-gray-900">
                  Email verified successfully!
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Redirecting you to login...
                </p>
              </div>
            ) : (
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-medium text-gray-900">
                  Verification failed
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Redirecting you to login...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
