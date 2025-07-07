import { Handle, Position } from "@xyflow/react";
import clsx from "clsx";
import NODE_CONFIG from "../constants/node_constants";
import { useTranslation } from "react-i18next";
import _ from "lodash";

function NodeColumn({
  label,
  position = "left",
  children,
  handle,
}: {
  label: string;
  position?: "left" | "right";
  children?: React.ReactNode;
  handle?: {
    nodeType: keyof typeof NODE_CONFIG;
    id: string;
  };
}) {
  const { t } = useTranslation("core.apiBuilder");

  return (
    <div className="space-y-1 relative">
      <label
        className={clsx(
          "text-sm block font-medium text-bg-500 w-full",
          position === "left" ? "text-left" : "text-right"
        )}
      >
        {t([
          `nodes.${_.camelCase(label)}`,
          `nodeColumns.${_.camelCase(label)}`,
          label,
        ])}
      </label>
      {children && <div>{children}</div>}
      {handle && (
        <Handle
          type={position === "left" ? "target" : "source"}
          position={position === "left" ? Position.Left : Position.Right}
          id={handle.id}
          className={clsx(
            "size-3! rounded-full border border-bg-200 dark:border-bg-900 top-1/2!",
            position === "left" ? "-left-3! right-auto!" : "-right-3!"
          )}
          style={{ backgroundColor: NODE_CONFIG[handle.nodeType].color }}
        />
      )}
    </div>
  );
}

export default NodeColumn;
