import { useMemo } from "react";
import type { DBFileSelectType } from "~/server/db/schema";

export function useFilteredItems(
  items: DBFileSelectType[],
  searchQuery: string,
) {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return items;
    }

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [items, searchQuery]);
}
