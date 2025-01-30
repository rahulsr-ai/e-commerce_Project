"use client"

import Link from 'next/link';
import { useState } from 'react';
import Model from '@/app/components/Model';

export default function SignUpComp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modelOpen, setModelOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setModelOpen(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-violet-600 text-center">StorX</h1>
        <p className="text-gray-400 text-sm text-center mt-2">Create your account</p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Sign up
          </button>
        </form>
        <p className="text-gray-400 text-xs mt-4 text-center">
          I confirm that I have read, consent and agree to StorX's{' '}
          <Link href="#" className="text-violet-600 hover:underline">
            Terms of Use
          </Link>{' '}
          and{' '}
          <Link href="#" className="text-violet-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link href="/signin" className="text-violet-600 hover:underline">
            Sign in
          </Link>
        </p>
        <div className="flex items-center mt-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <button className="w-full p-3 mt-6 bg-gray-700 text-white rounded hover:bg-gray-600">
          Sign up with Google
        </button>
      </div>
      <Model isOpen={modelOpen} setmodel={setModelOpen} />
    </div>  
  );
}