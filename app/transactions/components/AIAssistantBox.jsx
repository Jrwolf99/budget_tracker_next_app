import { useEffect } from "react";
import CardContainer from "@/app/components/general/CardContainer";
import { authedPost, authedPut } from "@/app/utility/common";
import { currentUserId } from "@/app/utility/localStorage";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AIAssistantBox({ month, year, fetchSpends }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorizedSpends, setCategorizedSpends] = useState(null);
  const [currentSpendIndex, setCurrentSpendIndex] = useState(0);

  const handleSaveSpendCategory = () => {
    authedPut("spends/update", {
      user_id: currentUserId(),
      id: categorizedSpends[currentSpendIndex].id,
      spend_category: {
        identifier: categorizedSpends[currentSpendIndex].category,
      },
    });
  };

  const handleAcceptSpend = () => {
    handleSaveSpendCategory();
    setCurrentSpendIndex(currentSpendIndex + 1);
  };

  const handleIgnoreSpend = () => {
    setCurrentSpendIndex(currentSpendIndex + 1);
  };

  const handleAskAIToCategorize = () => {
    setIsLoading(true);
    setCurrentSpendIndex(0);

    authedPost("spends/ai_categorize", {
      user_id: currentUserId(),
      month: month,
      year: year,
    })
      .then((res) => {
        setIsLoading(false);
        setCategorizedSpends(res.data.categorized_spends);
        if (res.data.categorized_spends?.length > 0) {
          setIsModalOpen(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert("Error: " + err.response.data.message);
      });
  };

  const handleCloseModal = () => {
    console.log("closing modal");
    setIsModalOpen(false);
    setCategorizedSpends(null);
    setCurrentSpendIndex(0);
    fetchSpends();
  };

  useEffect(() => {
    if (categorizedSpends && currentSpendIndex >= categorizedSpends.length) {
      handleCloseModal();
    }
  }, [currentSpendIndex, categorizedSpends]);

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
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
      >
        <DialogContent className="max-h-[60vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              AI Assistant {currentSpendIndex + 1} /{" "}
              {categorizedSpends?.length || 0}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            {categorizedSpends && categorizedSpends.length > 0 ? (
              <div className="text-sm text-gray-600">
                {categorizedSpends[currentSpendIndex] && (
                  <div className="flex flex-col gap-4 p-4 border rounded-lg bg-gray-50">
                    <div className="text-lg font-medium">
                      {categorizedSpends[currentSpendIndex].description}
                    </div>
                    <div className="inline-flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Suggested Category:
                      </span>
                      <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                        {categorizedSpends[currentSpendIndex].category}
                      </span>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={handleAcceptSpend}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={handleIgnoreSpend}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                )}
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
