"use client";
import useFormat from "@/app/utility/useFormat";
import React, { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import { authedGet, fetchCurrentUser } from "../utility/common";
import { currentUserId } from "../utility/localStorage";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Tooltip from "../components/ToolTip";
import CardContainer from "../components/general/CardContainer";
import { useRouter } from "next/navigation";
import CategoryLineGraphs from "./CategoryLineGraphs";
import SpendCategoryPicker from "../components/SpendCategoryPicker";

// TODO: Add a spend_category_identifier to the backend endpoint
// have the graphs show the category expenses for the year, as well as the month to month goals.

// TODO: when uploading files, make a background job and add a loading spinner in place of the
// upload button when the file is being processed.

export default function OverviewPage() {
  const router = useRouter();

  const { formatDollar } = useFormat();
  const [year, setYear] = useState(null);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);

  const [overviewData, setOverviewData] = useState([]);
  const [totals, setTotals] = useState({});

  const handleReverseOverviewData = (overviewData) => () => {
    setOverviewData([...overviewData].reverse());
  };

  useEffect(() => {
    if (!year || !selectedIdentifier) {
      return;
    }
    const getOverview = () => {
      const response = authedGet("spends/years_overview_report", {
        user_id: currentUserId(),
        year: year,
        spend_category_identifier: selectedIdentifier,
      }).then((response) => {
        setOverviewData(response.data.months);
        setTotals(response.data.totals);
      });
    };
    getOverview();
  }, [year, selectedIdentifier]);

  const headerClasses =
    "text-[7px] sm:text-[15px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";

  const tableClasses =
    "text-[7px] sm:text-[15px] px-2 py-1 mr-2 sm:px-6 sm:py-3 sm:mr-4 whitespace-nowrap";

  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchCurrentUser().then((res) => setCurrentUser(res));
  }, []);

  if (overviewData.length == 0) {
    return (
      <div className="flex flex-row flex-wrap justify-center items-start gap-4 p-1 pt-6 sm:p-6 bg-slate-200">
        <CardContainer customClassNames="mb-[10px] max-w-[1000px]">
          <div className="flex items-center gap-2">
            <h2 className="font-bold">Overview</h2>
            <DatePicker justYear year={year} setYear={setYear} />
            <SpendCategoryPicker
              setSelectedIdentifier={setSelectedIdentifier}
              justStandardExpenses
              noUncategorized
            />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold my-16">
              No data for the year, start spending!
              {currentUser &&
                currentUser?.email === "jrwolf99+guest@outlook.com" && (
                  <div className="text-sm mt-4">
                    Try heading to 2023 for some sample data.
                  </div>
                )}
            </h2>
          </div>
        </CardContainer>
      </div>
    );
  }

  const topRowClasses =
    "text-[11px] sm:text-[20px] px-2 py-1 mr-2 sm:px-6 sm:mr-4 whitespace-nowrap align-top pt-3";
  return (
    <div className="flex flex-row flex-wrap justify-center items-start gap-4 p-1 pt-6 sm:p-6 bg-slate-200">
      <CardContainer customClassNames="mb-[10px] max-w-[1000px]">
        <div className="flex items-center gap-2">
          <h2 className="font-bold">Overview</h2>
          <DatePicker justYear year={year} setYear={setYear} />
          <SpendCategoryPicker
            setSelectedIdentifier={setSelectedIdentifier}
            justStandardExpenses
            noUncategorized
          />
        </div>
        <table className="divide-gray-200 table-auto min-w-full mt-4">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className={headerClasses}>
                Month
              </th>
              {selectedIdentifier == "all" && (
                <th scope="col" className={headerClasses}>
                  Income
                </th>
              )}

              <th scope="col" className={headerClasses}>
                <div className="flex items-center">
                  <div>Expenses</div>
                </div>
              </th>

              {selectedIdentifier == "all" && (
                <th scope="col" className={headerClasses}>
                  <div className="flex items-center">
                    <div> Profit (What&apos;s left)</div>
                    <Tooltip tooltipText="Income - Expenses">
                      <InformationCircleIcon className="h-4 w-4 ml-2" />
                    </Tooltip>
                  </div>
                </th>
              )}

              {selectedIdentifier == "all" && (
                <th scope="col" className={`${headerClasses} text-center`}>
                  <div className="flex items-center">
                    <div>Profit Margin</div>
                    <Tooltip tooltipText="Profit / Income">
                      <InformationCircleIcon className="h-4 w-4 ml-2" />
                    </Tooltip>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <tr className="text-lg">
              <td className={topRowClasses}>
                <button
                  onClick={handleReverseOverviewData(overviewData)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <strong>Total</strong>
                </button>
              </td>

              {selectedIdentifier == "all" && (
                <td className={topRowClasses}>
                  <strong>{formatDollar(totals?.total_income || 0)}</strong>
                </td>
              )}

              <td className={topRowClasses}>
                <div className="flex items-center text-end pr-8">
                  <strong
                    className={
                      Math.abs(totals?.total_expenses || 0) <
                      Math.abs(totals?.total_expense_goals || 0)
                        ? "text-yellow-600"
                        : "text-gray-900"
                    }
                  >
                    {formatDollar(totals?.total_expenses || 0)}
                    <br />
                    <span
                      className={
                        Math.abs(totals?.total_expenses || 0) <
                        Math.abs(totals?.total_expense_goals || 0)
                          ? "text-yellow-600 text-[6px] sm:text-xs pb-4"
                          : "text-gray-500 text-[6px] sm:text-xs pb-4"
                      }
                    >
                      Goal: {formatDollar(-totals?.total_expense_goals || 0)}
                    </span>
                  </strong>
                </div>
              </td>

              {selectedIdentifier == "all" && (
                <td className={topRowClasses}>
                  <strong>{formatDollar(totals?.total_profit || 0)}</strong>
                </td>
              )}

              {selectedIdentifier == "all" && (
                <td className={topRowClasses}>
                  <strong>{totals?.total_margin_percentage || 0}</strong>
                </td>
              )}
            </tr>

            <tr>
              <td />
            </tr>

            {overviewData?.map((month) => (
              <tr
                key={month.key}
                className="hover:bg-slate-200"
                onClick={() => {
                  if (selectedIdentifier == "all") {
                    router.push(
                      `/details?month=${parseInt(
                        month.month_number
                      )}&year=${year}`
                    );
                  } else {
                    router.push(
                      `/transactions?selected_identifier=${selectedIdentifier}&month=${parseInt(
                        month.month_number
                      )}&year=${year}`
                    );
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <td className={tableClasses}>{month.month_name}</td>

                {selectedIdentifier == "all" && (
                  <td className={tableClasses}>
                    {formatDollar(month.month_income)}
                  </td>
                )}

                <td className={`${tableClasses} text-end`}>
                  <div
                    className={`text-end pr-8 ${
                      Math.abs(month.month_expenses) <
                      Math.abs(month.month_expense_goals)
                        ? "text-yellow-600"
                        : "text-gray-900"
                    }`}
                  >
                    {formatDollar(month.month_expenses)}
                    <br />
                    <span
                      className={`${
                        Math.abs(month.month_expenses) <
                        Math.abs(month.month_expense_goals)
                          ? "text-yellow-600 text-[6px] sm:text-xs"
                          : "text-gray-500 text-[6px] sm:text-xs"
                      }`}
                    >
                      Goal: {formatDollar(-month.month_expense_goals)}
                    </span>
                  </div>
                </td>

                {selectedIdentifier == "all" && (
                  <>
                    {" "}
                    {month.month_profit > 0 ? (
                      <td className={`${tableClasses} text-green-600`}>
                        {formatDollar(month.month_profit)}
                      </td>
                    ) : (
                      <td className={`${tableClasses} text-red-500`}>
                        {formatDollar(month.month_profit)}
                      </td>
                    )}
                  </>
                )}

                {selectedIdentifier == "all" && (
                  <>
                    {" "}
                    {month.month_profit > 0 ? (
                      <td className={`${tableClasses} text-green-600`}>
                        {month.month_margin_percentage}
                      </td>
                    ) : (
                      <td className={`${tableClasses} text-red-500`}>
                        {month.month_margin_percentage}
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </CardContainer>
      {overviewData.length > 0 && (
        <CategoryLineGraphs
          selectedIdentifier={selectedIdentifier}
          overviewData={overviewData}
        />
      )}
    </div>
  );
}
