'use client';
import React, { useState } from 'react';
import { authedPost } from '../utility/common';

export default function Settings() {
  const handleResendVerificationEmail = () => {
    authedPost('authentications/email_verification/create', {
      email,
    })
      .then((res) => {
        alert('Verification email sent!');
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen bg-gray-200 pt-16">
      <div className="bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-2xl font-semibold mb-4">
          Resend Verification Email
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="min-w-[200px] flex flex-col justify-center gap-4 items-center">
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
            onClick={handleResendVerificationEmail}
          >
            Resend Verification Email
          </button>
        </div>
      </div>
    </div>
  );
}
