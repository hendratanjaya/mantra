import React from "react";
import { VscLoading } from "react-icons/vsc";

export default function Loading() {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
      <VscLoading fontSize={24} className="animate-spin mx-auto" />
    </div>
  );
}
