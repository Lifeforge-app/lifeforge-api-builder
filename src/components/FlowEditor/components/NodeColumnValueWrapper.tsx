import React from "react";

function NodeColumnValueWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <div className="border border border-bg-200 disabled:text-bg-500 dark:border-bg-800 component-bg-lighter rounded-md h-10 flex items-center px-3 w-full">
      {children}
    </div>
  );
}

export default NodeColumnValueWrapper;
