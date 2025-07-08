import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import React from "react";
import NODE_CONFIG, { type NODE_TYPES } from "../nodes";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { oklchToHex } from "../../../utils/colors";

function Node({
  nodeType,
  selected,
  children,
}: {
  nodeType: NODE_TYPES;
  selected?: boolean;
  children?: React.ReactNode;
}) {
  const { t } = useTranslation("core.apiBuilder");

  return (
    <div
      className={clsx(
        "rounded-xl p-3 border component-bg shadow-custom w-[260px] transition-colors",
        !selected ? "border-bg-200 dark:border-bg-800" : ""
      )}
      style={{
        borderColor: selected ? oklchToHex(NODE_CONFIG[nodeType].color) : "",
      }}
    >
      <header className="flex justify-between items-center">
        <div
          className="font-semibold w-full min-w-0 flex items-center gap-2"
          title={NODE_CONFIG[nodeType].name}
        >
          <div
            className="size-7 rounded-md flex-center"
            style={{
              backgroundColor: oklchToHex(NODE_CONFIG[nodeType].color) + "20",
            }}
          >
            <Icon
              icon={NODE_CONFIG[nodeType].icon || "tabler:circle"}
              className="size-5 shrink-0"
              style={{
                color: NODE_CONFIG[nodeType].color || "#000",
              }}
            />
          </div>
          <span className="truncate">
            {t([
              `nodes.${_.camelCase(NODE_CONFIG[nodeType].name)}`,
              NODE_CONFIG[nodeType].name,
            ])}
          </span>
        </div>
      </header>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default Node;
