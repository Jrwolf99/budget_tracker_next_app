import CardContainer from "@/app/components/general/CardContainer";
import { authedPost } from "@/app/utility/common";
import { currentUserId } from "@/app/utility/localStorage";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AIAssistantBox({ month, year }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [categorizedSpends, setCategorizedSpends] = useState(null);

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
        setCategorizedSpends(res.data.categorized_spends);
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
        disabled={isLoading}
        className="py-2 px-4 text-sm text-white bg-primary rounded hover:bg-primary focus:outline-none transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
      >
        {isLoading ? "Loading..." : "Ask AI To Categorize"}
      </button>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {categorizedSpends && categorizedSpends.length > 0 ? (
              <div className="text-sm text-gray-600">
                {categorizedSpends.map((result) => (
                  <div key={result.id}>
                    {result.id} - {result.description} - {result.category}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                No spends were categorized using AI. Chances are all of them
                already have AI suggestions, have been manually categorized, or
                the AI was unable to categorize them.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </CardContainer>
  );
}
