"use client";
import React, { useEffect, useState } from "react";
import {
  authedPost,
  fetchCurrentUser,
  authedPut,
  authedGet,
} from "../utility/common";
import NotesWithTimer from "../transactions/components/utility/NotesWithTimer";
import { currentUserId } from "../utility/localStorage";

export default function Settings() {
  const handleResendVerificationEmail = () => {
    authedPost("authentications/email_verification/create", {
      email,
    })
      .then((res) => {
        alert("Verification email sent!");
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  };

  const [email, setEmail] = useState("");
  const [spendAccount, setSpendAccount] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser().then((res) => setCurrentUser(res));
    console.log(currentUserId());
    authedGet("spend_accounts/show", {
      user_id: currentUserId(),
    }).then((res) => setSpendAccount(res?.data));
  }, []);

  useEffect(() => {
    if (spendAccount) {
      setAIRules(spendAccount?.ai_rules);
    }
  }, [spendAccount]);

  const [aiRules, setAIRules] = useState("");

  const handleUpdateAIRules = () => {
    authedPut("spend_accounts/update", {
      user_id: currentUserId(),
      spend_account: {
        ai_rules: aiRules || "",
      },
    });
  };

  return (
    <div className="flex flex-col w-full justify-start items-center h-screen bg-gray-200 pt-16 text-[10px] sm:text-[15px]">
      <div className="w-[90%] max-w-[800px] bg-white p-8 m-8 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium mr-4">Email:</span>
            <span className="text-gray-600">{currentUser?.email}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium mr-4">Verified:</span>
            <span
              className={`text-${currentUser?.verified ? "green" : "red"}-600`}
            >
              {currentUser?.verified ? "Yes" : "No"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium mr-4">Created At:</span>
            <span className="text-gray-600">
              {new Date(currentUser?.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] bg-white p-8 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4 text-start w-full text-start">
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
            className="w-full max-w-[400px] p-2 border rounded bg-gray-200"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 items-center">
          <button
            className="w-full  max-w-[400px]  py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 mb-2"
            onClick={handleResendVerificationEmail}
          >
            Resend Verification Email
          </button>
        </div>
      </div>

      <div className="w-[90%] max-w-[800px] bg-white p-8 rounded shadow-lg mt-8">
        <h2 className="text-xl font-semibold mb-4">AI Categorization Rules</h2>
        <p className="text-gray-600 mb-4">
          Add notes to help the AI understand how to categorize your
          transactions.
        </p>

        <div className="space-y-4">
          <NotesWithTimer
            placeholder="Add your AI categorization rules here...
                          Examples:
                          - Transactions containing 'WALMART' are usually groceries
                          - Anything from 'SHELL' or 'EXXON' is gas
                          - 'NETFLIX' and 'SPOTIFY' are entertainment"
            classNames="w-full h-[200px] p-2 border rounded resize-y"
            value={aiRules}
            setValue={setAIRules}
            timerEndFunction={handleUpdateAIRules}
          />
        </div>
      </div>
    </div>
  );
}
