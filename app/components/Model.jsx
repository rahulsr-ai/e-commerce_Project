"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useTimer } from "@/context/TimerContext";

const Model = ({ isOpen, setmodel, password, email, username }) => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [ResendCounter, setResendCounter] = useState(0);

  const { timeLeft, canResend, resetTimer } = useTimer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setMessage("Please enter a valid code");
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/verifyemail/verifyotp", {
        name: username,
        email,
        password,
        verifyOtp: parseInt(code),
      });

      if (data?.success) {
        toast.success("Account verified successfully!");
        setmodel(false);
        router.push("/sign-in");
      } else {
        setMessage("Failed to send code");
        toast.error(data?.message);
        setCode("");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      setMessage("Failed to send code");
    }
  };

  const handleResend = async () => {
    setResendCounter(ResendCounter + 1); // Increment the resend number counter

    if (ResendCounter > 10) {
      toast.error(
        "You have reached the maximum number of resend attempts. Please try again later."
      );
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/verifyemail/sendotp", {
        name: username,
        email,
        password,
      });
      console.log(data);

      if (data?.success) {
        resetTimer(); // Reset the timer when the OTP is resent
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("frontend error while requesting for resend otp ");
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed  top-0 left-0 w-full h-full backdrop-blur-md bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="dark:bg-black p-4 border rounded-lg shadow-lg ">
        <h3 className="text-base text-center font-medium">
          {" "}
          Verification code has sent to
          <p className="block">{email}</p>
        </h3>
        <form onSubmit={handleSubmit} className="p-4 ">
          <div className="flex justify-center">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={code[index] || ""}
                onChange={(e) => {
                  const newCode = code.split("");
                  const value = e.target.value;

                  // Allow only numbers
                  if (/^[0-9]$/.test(value) || value === "") {
                    newCode[index] = value;
                    setCode(newCode.join(""));
                    if (value && index < 5) {
                      document
                        .getElementById(`code-input-${index + 1}`)
                        .focus();
                    }
                  }
                }}
                className="w-12 h-12 mx-1 text-center border border-gray-300 rounded outline-violet-600 text-black"
                placeholder="0"
                id={`code-input-${index}`}
                required
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-violet-500 transition-all duration-200 rounded-md text-white font-medium"
            disabled={message === "Code sent to your email!"}
          >
            {message === "Code sent to your email!"
              ? "Processing..."
              : "Submit"}
          </button>
        </form>
        {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setmodel(false)}
            className="text-gray-200-500 hover:underline"
          >
            Close
          </button>

          {canResend ? (
            <button
              onClick={handleResend}
              className="text-violet-200 text-sm hover:text-violet-600 transition-colors"
            >
              Request new code
            </button>
          ) : (
            <p className="text-gray-200-500">
              Code will expire in{" "}
              <span className="font-semibold">
                {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, "0")} ⌛
                {/* <TimeGlassComponnent /> */}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Model;