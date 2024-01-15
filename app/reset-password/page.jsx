'use client';
import React, { useState } from 'react';
import { unauthedPost } from '../utility/common';

export default function ResetPassword() {
  const [email, setEmail] = useState('');

  const handleSendResetPasswordEmail = async () => {
    await unauthedPost('password_reset/create', {
      email,
    });
  };

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen bg-gray-200 pt-16">
      <div className="bg-white p-8 rounded shadow-lg mt-8">
        <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
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
        <div className="min-w-[200px] flex flex-col justify-center gap-4 items-center">
          <button
            className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
            onClick={handleSendResetPasswordEmail}
          >
            Send Reset Password Email
          </button>
        </div>
      </div>
    </div>
  );
}
