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
import SelectWithTimer from "./utility/SelectWithTimer";
import { useSpendCategories } from "@/app/hooks/useSpendCategories";
import useFormat from "@/app/utility/useFormat";
import { ChevronLeftIcon } from "lucide-react";

export default function AIAssistantBox({ month, year, fetchSpends }) {
  const { monthIntToString } = useFormat();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categorizedSpends, setCategorizedSpends] = useState(null);
  const [currentSpendIndex, setCurrentSpendIndex] = useState(0);
  const [isManualCategorize, setIsManualCategorize] = useState(false);
  const { selectOptions: selectOptionsSpendCategory } = useSpendCategories({
    justStandardExpenses: false,
    noUncategorized: true,
    noAll: true,
  });

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
    setIsManualCategorize(false);
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
      <div className="flex flex-col gap-1 mb-4">
        <div className="text-sm font-semibold text-gray-600">AI Assistant</div>
        <div className="text-xs text-gray-500">
          Only available for one month at a time.
        </div>
      </div>
      <button
        type="button"
        onClick={handleAskAIToCategorize}
        disabled={isLoading}
        className="py-2 px-4 text-sm text-white bg-primary rounded hover:bg-primary focus:outline-none transition-transform transform hover:translate-y-[-2px] hover:shadow-lg"
      >
        {isLoading
          ? "Loading..."
          : `Ask AI To Categorize ${monthIntToString(month)} ${year}`}
      </button>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseModal();
          }
        }}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto">
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
                    {currentSpendIndex > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentSpendIndex(currentSpendIndex - 1);
                        }}
                        className="self-start flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    )}
                    <div className="text-lg font-medium">
                      {categorizedSpends[currentSpendIndex].description}
                    </div>
                    {!isManualCategorize && (
                      <div className="inline-flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          Suggested Category:
                        </span>
                        <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                          {categorizedSpends[currentSpendIndex].category}
                        </span>
                      </div>
                    )}

                    {isManualCategorize && (
                      <div className="flex flex-col gap-2">
                        <SelectWithTimer
                          timerEndFunction={() => {
                            handleSaveSpendCategory();
                          }}
                          value={categorizedSpends[currentSpendIndex].category}
                          setValue={(value) => {
                            setCategorizedSpends(
                              categorizedSpends.map((spend, index) =>
                                index === currentSpendIndex
                                  ? { ...spend, category: value }
                                  : spend
                              )
                            );
                          }}
                          options={selectOptionsSpendCategory}
                        />
                      </div>
                    )}
                    {!isManualCategorize ? (
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
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentSpendIndex(currentSpendIndex + 1);
                          setIsManualCategorize(false);
                        }}
                        className="max-w-[300px] px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                      >
                        Next
                      </button>
                    )}
                    {!isManualCategorize && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsManualCategorize(true)}
                          className="underline text-xs text-gray-500"
                        >
                          Manual Categorize
                        </button>
                      </div>
                    )}
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
