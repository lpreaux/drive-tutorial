"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

const TopbarContext = createContext<{
  leftContent: ReactNode;
  setLeftContent: (content: ReactNode) => void;
}>({
  leftContent: null,
  setLeftContent: () => {},
});

export const useTopbar = () => useContext(TopbarContext);

export default function TopbarProvider({ children }: { children: ReactNode }) {
  const [leftContent, setLeftContent] = useState<ReactNode>(null);

  return (
    <TopbarContext.Provider
      value={{
        leftContent,
        setLeftContent,
      }}
    >
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div>{leftContent}</div>
      </header>
      {children}
    </TopbarContext.Provider>
  );
}
