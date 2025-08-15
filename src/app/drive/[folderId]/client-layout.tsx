"use client";
import React, { useEffect } from "react";
import { useTopbar } from "~/components/dashboard/topbar/topbar-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

interface Parent {
  id: number;
  name: string;
}

export default function ClientLayout({
  children,
  parents,
  currentFolderId,
}: {
  children: React.ReactNode;
  parents: Parent[];
  currentFolderId: number;
}) {
  const { setLeftContent } = useTopbar();

  useEffect(() => {
    setLeftContent(
      <Breadcrumb>
        <BreadcrumbList>
          {parents.map((parent) =>
            parent.id !== currentFolderId ? (
              <React.Fragment key={parent.id}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={`/drive/${parent.id}`}>
                    {parent.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            ) : (
              <BreadcrumbItem key={parent.id}>
                <BreadcrumbPage>{parent.name}</BreadcrumbPage>
              </BreadcrumbItem>
            ),
          )}
        </BreadcrumbList>
      </Breadcrumb>,
    );

    // Cleanup au démontage
    return () => {
      setLeftContent(null);
    };
  }, [parents, currentFolderId, setLeftContent]);

  return <>{children}</>;
}
