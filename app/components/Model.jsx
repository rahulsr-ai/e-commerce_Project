"use client"
import { useState } from "react";


const Model = ({ isOpen, setmodel ,password, email, username}) => {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.length === 6) {
    
    } else {
      setMessage("Please enter a valid 6-digit code.");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
                value={code[index] || ''}
                onChange={(e) => {
                  const newCode = code.split('');
                  const value = e.target.value;

                  // Allow only numbers
                  if (/^[0-9]$/.test(value) || value === '') {
                    newCode[index] = value;
                    setCode(newCode.join(''));
                    if (value && index < 5) {
                      document.getElementById(`code-input-${index + 1}`).focus();
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
          <button type="submit" className="mt-4 w-full p-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-200 rounded-md" disabled={message === "Code sent to your email!"}>
            {message === "Code sent to your email!" ? "Processing..." : "Submit"}
          </button>
        </form>
        {/* {message && <p className="mt-2 text-red-500">{message}</p>} */}
        <div className="flex justify-between mt-4">
          <button onClick={() => setmodel(false)} className="text-gray-500 hover:underline">Close</button>
          <button onClick={() => alert("Requesting new code...")} className="text-violet-600 hover:underline">Resend Code</button>
        </div>
      </div>
    </div>
  );
};



export default Model