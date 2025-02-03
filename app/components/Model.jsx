"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "@/app/components.css";

const Model = ({ isOpen, setmodel, password, email, username }) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [ResendCounter, setResendCounter] = useState(0);

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Start the timer if timeLeft > 0
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      // Clean up timer when component unmounts or timer reaches 0
      return () => clearInterval(timer);
    } else {
      setCanResend(true); // Enable the resend button when timer reaches 0
    }
  }, [timeLeft]);

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

      if (data.status === 200) {
        toast.success("Account verified successfully!");
        setmodel(false);
        r;
      } else {
        setMessage("Failed to send code");
      }
    } catch (error) {
      console.error("Error sending code:", error);
      setMessage("Failed to send code");
    }
  };

  const handleResend = async () => {
    setResendCounter(ResendCounter + 1); // Increment the resend number counter
    alert("Requesting new code...");
    setTimeLeft(300); // Reset the timer
    setCanResend(false); // Disable resend button

    if (ResendCounter > 10) {
      alert(
        "You have reached the maximum number of resend attempts. Please try again later."
      );
      return;
    }

    

    try {
      const { data } = await axios.post("/api/auth/verifyemail/sendotp", {
        name,
        email,
        password,
      });
      console.log(data);

      if (data.status === 200) {
        alert("OTP request sent successfully");
      }
    } catch (error) {
      console.log("frontend error while requesting for resend otp ");
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-neutral-900 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Enter 6-Digit Code</h3>
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
            className="mt-4 w-full p-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-200 rounded-md"
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
            className="text-gray-500 hover:underline"
          >
            Close
          </button>

          {canResend ? (
            <button
              onClick={handleResend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Resend Code
            </button>
          ) : (
            <p className="text-gray-500">
              Resend available in{" "}
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

const TimeGlassComponnent = () => {
  return <div class="loader"></div>;
};
