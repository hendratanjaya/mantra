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
import { Fragment, useMemo } from "react";
import { useBreadcrumbStore } from "../_stores/use-breadcrumb-store";
export function BreadCrumbHeader() {
  const path = usePathname();
  const { items } = useBreadcrumbStore();

  const fallbackCrumbs = useMemo(() => {
    const segments = path.split("/").filter(Boolean);

    return segments.map((segment, idx) => {
      const href = "/" + segments.slice(0, idx + 1).join("/");
      const isLast = idx === segments.length - 1;

      return { href, label: segment, isLast };
    });
  }, [path]);

  const crumbs =
    items.length > 0
      ? items.map((item, idx) => ({
          ...item,
          isLast: idx === items.length - 1,
        }))
      : fallbackCrumbs;

  if (!crumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => (
          <Fragment key={crumb.href}>
            <BreadcrumbItem className="hidden md:block">
              {!crumb.isLast ? (
                <BreadcrumbLink href={crumb.href} className="capitalize">
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">
                  {crumb.label}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {idx !== crumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
