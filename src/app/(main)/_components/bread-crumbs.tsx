"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export function BreadCrumbHeader() {
  const path = usePathname();

  const pathSegment = path.split("/").filter((segment) => segment);

  const breadCrumbs = pathSegment.map((segment, idx) => {
    const href = "/" + pathSegment.slice(0, idx + 1).join("/");
    const isLastPath = idx === pathSegment.length - 1;

    return (
      <BreadcrumbItem key={href} className="hidden md:block">
        {!isLastPath ? (
          <>
            <BreadcrumbLink href={href} className="capitalize">
              {segment}
            </BreadcrumbLink>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        ) : (
          <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadCrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
