"use client";

import { VerifyEmail } from "@/actions/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const { email, name } = router.query; // Get email from query parameter

  const [isloading, setisLoading] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState([]);
  const [password, setPassword] = useState("");

  const inputOtp = (e) => {
    setVerifyOtp(() => [...verifyOtp, e.target.value]);
  };

  console.log(verifyOtp);

  return (
    isloading && (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <h1 className="text-3xl font-bold">Verify Email {name}</h1>

        <form
          onSubmit={() => VerifyEmail(verifyOtp, password, email, name)}
          className="flex flex-col gap-2"
        >
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />
          <input
            type="number"
            onChange={inputOtp}
            name="otp"
            className="size-8 rounded outline-violet-500  "
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Set Password"
            required={true}
            className="px-3 py-2 rounded outline-none  "
          />
        </form>

        <p className="text-lg">Please check your email for verification Code</p>
      </div>
    )
  );
};

export default VerifyEmailPage;
