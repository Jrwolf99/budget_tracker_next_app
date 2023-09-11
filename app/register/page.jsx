'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [confirmPassword, setConfirmPassword] = React.useState('');
  //using axios
  const handleRegister = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_DOMAIN}/api/v1/authentications/sign_up`,
        {
          email,
          password,
          password_confirmation: confirmPassword,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert('Registration successful');
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err.response.data));
        if (err.response.data.password) {
          alert('password: ' + err.response.data.password);
        }
        if (err.response.data.email) {
          alert('email: ' + err.response.data.email);
        }
        if (err.response.data.password_confirmation) {
          alert(
            'password confirmation: ' + err.response.data.password_confirmation
          );
        }
      });
  };

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen bg-gray-200 pt-16">
      <div className="bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-2xl font-semibold mb-4">
          Register to the Budget Tracker
        </h1>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200"
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
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="min-w-[200px] flex flex-col justify-center gap-4 items-center">
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
            onClick={() => handleRegister()}
          >
            Register
          </button>

          <Link
            href="/login"
            className="underline hover:text-blue-500 w-full m-auto"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
