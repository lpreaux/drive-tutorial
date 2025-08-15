"use client";

import { Grid3X3, List } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ViewModeSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentViewMode = searchParams.get("viewMode") ?? "list";

  const switchViewMode = useCallback(
    (newMode: "list" | "grid") => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("viewMode", newMode);
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="flex items-center gap-1 rounded-md border p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={currentViewMode === "list" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => switchViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>List view</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={currentViewMode === "grid" ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => switchViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Grid view</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
