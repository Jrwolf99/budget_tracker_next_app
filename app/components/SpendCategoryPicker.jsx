import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { authedGet } from "../utility/common";
import { useSpendCategories } from "../hooks/useSpendCategories";

export default function SpendCategoryPicker({
  selectedIdentifier,
  setSelectedIdentifier,
  justStandardExpenses = false,
  noUncategorized = false,
}) {
  const { listOfCategories, selectOptions: selectOptionsSpendCategory } =
    useSpendCategories({
      justStandardExpenses,
      noUncategorized,
    });

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("selected_identifier")) {
      setSelectedIdentifier(searchParams.get("selected_identifier"));
    }
  }, []);

  return (
    <div className="flex items-center gap-2 min-w-[200px] relative">
      <Select
        id="long-value-select"
        instanceId="long-value-select"
        className="text-sm flex-1"
        name="categories"
        options={selectOptionsSpendCategory}
        onChange={(e) => {
          setSelectedIdentifier(e.value);
          const params = new URLSearchParams(searchParams);
          params.set("selected_identifier", e.value);
          router.replace(`${pathname}?${params}`);
        }}
        value={
          {
            value: searchParams.get("selected_identifier"),
            label: listOfCategories?.find(
              (category) =>
                category.identifier === searchParams.get("selected_identifier")
            )?.name,
          } || { value: "all", label: "All" }
        }
      />
    </div>
  );
}
