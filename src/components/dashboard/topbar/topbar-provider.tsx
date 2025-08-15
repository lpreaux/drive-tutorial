"use client";

import { createContext, useContext, type ReactNode, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar";

const TopbarContext = createContext<{
  leftContent: ReactNode;
  setLeftContent: (content: ReactNode) => void;
  rightContent: ReactNode;
  setRightContent: (content: ReactNode) => void;
}>({
  leftContent: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLeftContent: () => {},
  rightContent: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRightContent: () => {},
});

export const useTopbar = () => useContext(TopbarContext);

export default function TopbarProvider({ children }: { children: ReactNode }) {
  const [leftContent, setLeftContent] = useState<ReactNode>(null);
  const [rightContent, setRightContent] = useState<ReactNode>(null);

  return (
    <TopbarContext.Provider
      value={{
        leftContent,
        setLeftContent,
        rightContent,
        setRightContent,
      }}
    >
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        {/* Left content (breadcrumb, etc.) */}
        <div className="flex-1">{leftContent}</div>

        {/* Right content (view switcher, etc.) */}
        {rightContent && (
          <>
            <Separator
              orientation="vertical"
              className="ml-2 data-[orientation=vertical]:h-4"
            />
            <div className="ml-2">{rightContent}</div>
          </>
        )}
      </header>
      {children}
    </TopbarContext.Provider>
  );
}