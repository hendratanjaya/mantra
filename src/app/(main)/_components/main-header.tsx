"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { BreadCrumbHeader } from "./bread-crumbs";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export function SiteHeader() {
  const typeTarget = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current, {
      strings: [
        "AI can make mistakes!",
        "I forgot why I opened this page.",
        "Why is this blinking at me?",
        "Loading confidence… failed successfully.",
        "Someone approved this, surprisingly.",
      ],
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 5000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center w-full justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <BreadCrumbHeader />
      </div>
      <div className="pe-2">
        <span ref={typeTarget} />
      </div>
    </header>
  );
}
