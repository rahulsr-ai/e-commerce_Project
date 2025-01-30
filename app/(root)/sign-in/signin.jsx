

import Link from 'next/link';

export default function SignIncomp() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-violet-600 text-center">StorX</h1>
        <p className="text-gray-400 text-sm text-center mt-2">Only login via email, Google, or +86 phone number</p>
        <form className="mt-6">
          <input
            type="text"
            placeholder="Phone number / email address"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 rounded text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Log in
          </button>
        </form>
        <p className="text-gray-400 text-xs mt-4 text-center">
          I confirm that I have read, consent and agree to StorX's{' '}
          <Link href="/terms" className="text-violet-600 hover:underline">
            Terms of Use
          </Link>{''}
          and{' '}
          <Link href="#" className="text-violet-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p className="text-violet-600 text-sm mt-4 text-center cursor-pointer hover:underline">
          Forgot password?
        </p>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{' '}
          <Link href="/signup" className="text-violet-600 hover:underline">
            Sign up
          </Link>
        </p>
        <div className="flex items-center mt-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <button className="w-full p-3 mt-6 bg-gray-700 text-white rounded hover:bg-gray-600">
          Log in with Google
        </button>
      </div>
    </div>
  );
}