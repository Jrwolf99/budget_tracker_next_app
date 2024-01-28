'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '../utility/common';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen bg-gray-200 pt-16">
      <div className="bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-2xl font-semibold mb-4">
          Login to the Budget Tracker
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full p-2 border rounded bg-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full p-2 border rounded bg-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="min-w-[200px] flex flex-col justify-center gap-4 items-center">
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
            onClick={() => login(email, password, router)}
          >
            Sign In
          </button>

          <Link
            href="/register"
            className="underline hover:text-blue-500 w-full m-auto text-center"
          >
            Go to Register
          </Link>

          <Link
            href="/reset-password"
            className="underline hover:text-blue-500 w-full m-auto text-center"
          >
            Forgot password?
          </Link>

          <button
            onClick={() =>
              login(
                'jrwolf99+guest@outlook.com',
                '?Y<gAUSo5=9V=3J![a(G',
                router,
                true
              )
            }
            className="underline hover:text-blue-500 w-full text-center"
          >
            Log in as guest
          </button>
        </div>
      </div>
    </div>
  );
}
