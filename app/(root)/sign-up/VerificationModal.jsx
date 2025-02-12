"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



const RESEND_TIMEOUT = 180; // 3 minutes in seconds
const MAX_RESEND_ATTEMPTS = 3;

const VerificationModal  = ({
  isOpen,
  onClose,
  formData,
}) => {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let timer
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleCodeChange = (index , value) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = code.split("");
    newCode[index] = value;
    const updatedCode = newCode.join("");
    setCode(updatedCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };


  useEffect(() => { 
    setIsLoading(true);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (code.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data } = await axios.post("/api/auth/verifyemail/verifyotp", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        verifyOtp: parseInt(code),
      });

      if (data?.status === 200 || data?.success) {
        toast.success("Account verified successfully!");
        onClose();
        router.push("/sign-in");

      } else {
        toast.error("Invalid verification code");
      }

    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Failed to verify code");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      toast.error("Maximum resend attempts reached. Please try again later.");
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/verifyemail/sendotp", formData);

      if (data.status === 200) {
        toast.success("New verification code sent");
        setResendAttempts((prev) => prev + 1);
        setTimeLeft(RESEND_TIMEOUT);
        setCode("");
      }
    } catch (error) {
      console.error("Error resending code:", error);
      toast.error("Failed to resend verification code");
    }
  };

  if (!isOpen) return null;

  return ( isLoading &&
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold text-white mb-4">Verify Your Email</h3>
        <p className="text-white/60 mb-6">
          Enter the 6-digit code sent to {formData.email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength={1}
                value={code[index] || ""}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-12 h-12 text-center text-lg font-semibold border border-white/20 rounded-lg bg-black text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              Change Details
            </button>

            {timeLeft > 0 ? (
              <p className="text-white/60">
                Resend in {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")}
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resendAttempts >= MAX_RESEND_ATTEMPTS}
                className="text-indigo-500 hover:text-indigo-400 disabled:text-white/40 disabled:cursor-not-allowed transition-colors"
              >
                Resend Code
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || code.length !== 6}
            className="w-full py-2.5 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {resendAttempts >= MAX_RESEND_ATTEMPTS && (
          <p className="mt-4 text-red-500 text-sm">
            Maximum resend attempts reached. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;