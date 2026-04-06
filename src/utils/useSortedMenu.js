import { useMemo } from "react";

const useSortedMenu = (menu = [], sortType = null) => {
  return useMemo(() => {
    if (!sortType) return menu;

    return menu.map((category) => {
      const sortedItems = [...category.items];

      if (sortType === "PRICE_LOW_TO_HIGH") {
        sortedItems.sort((a, b) => a.price - b.price);
      }

      if (sortType === "PRICE_HIGH_TO_LOW") {
        sortedItems.sort((a, b) => b.price - a.price);
      }

      return {
        ...category,
        items: sortedItems,
      };
    });
  }, [menu, sortType]);
};

export default useSortedMenu;