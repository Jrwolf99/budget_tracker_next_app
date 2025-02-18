import CardContainer from "@/app/components/general/CardContainer";
import { authedPost } from "@/app/utility/common";
import { currentUserId } from "@/app/utility/localStorage";
import React, { useState } from "react";

export default function AIAssistantBox({ month, year }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAskAIToCategorize = () => {
    setIsLoading(true);

    authedPost("spends/ai_categorize", {
      user_id: currentUserId(),
      month: month,
      year: year,
    })
      .then((res) => {
        setIsLoading(false);
        setOpenModal(true);
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Error: " + err.response.data.message);
      });
  };

  return (
    <CardContainer customClassNames="flex-1 min-w-[300px] max-w-[400px]">
      <div className="text-sm mb-4 font-semibold text-gray-600">
        AI Assistant
      </div>
      <button
        type="button"
        onClick={handleAskAIToCategorize}
        className="py-2 px-4 text-sm text-white bg-primary rounded hover:bg-primary focus:outline-none transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
      >
        Ask AI To Categorize
      </button>
    </CardContainer>
  );
}
