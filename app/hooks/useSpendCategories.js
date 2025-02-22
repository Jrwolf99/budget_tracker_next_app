import { useState, useEffect } from "react";
import { authedGet } from "../utility/common";

export function useSpendCategories({
  justStandardExpenses = false,
  noUncategorized = false,
  noAll = false,
} = {}) {
  const [listOfCategories, setListOfCategories] = useState([]);

  useEffect(() => {
    let endpoint = "/spend_categories/show_spend_categories_all";
    if (justStandardExpenses)
      endpoint = "/spend_categories/show_spend_categories_standard_expenses";
    authedGet(endpoint).then((response) => {
      setListOfCategories([
        ...(!noAll
          ? [
              {
                identifier: "all",
                name: "All",
              },
            ]
          : []),
        ...(!noUncategorized
          ? [
              {
                identifier: "uncategorized",
                name: "Uncategorized",
              },
            ]
          : []),
        ...response.data,
      ]);
    });
  }, [justStandardExpenses, noUncategorized]);

  const selectOptions = listOfCategories?.map((category) => ({
    value: category.identifier,
    label: category.name,
  }));

  return { listOfCategories, selectOptions };
}
