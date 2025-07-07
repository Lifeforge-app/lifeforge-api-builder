import { ListboxOption } from "@headlessui/react";
import React from "react";

function NodeListboxOption({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <ListboxOption
      value={value}
      className="flex items-center text-base gap-3 text-bg-500 p-2 rounded hover:bg-bg-100 focus:bg-bg-100 dark:hover:bg-bg-700/50 dark:focus:bg-bg-700/50 focus:outline-none transition-colors"
    >
      {children}
    </ListboxOption>
  );
}

export default NodeListboxOption;
