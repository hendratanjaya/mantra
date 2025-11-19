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
import { Fragment } from "react";
export function BreadCrumbHeader() {
  const path = usePathname();

  const pathSegment = path.split("/").filter((segment) => segment);

  const breadCrumbs = pathSegment.map((segment, idx) => {
    const href = "/" + pathSegment.slice(0, idx + 1).join("/");
    const isLastPath = idx === pathSegment.length - 1;

    return (
      <BreadcrumbItem key={href} className="hidden md:block">
        {!isLastPath ? (
          <BreadcrumbLink href={href} className="capitalize">
            {segment}
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrumbs.map((item, idx) => (
          <Fragment key={idx}>
            {item}
            {idx !== breadCrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
