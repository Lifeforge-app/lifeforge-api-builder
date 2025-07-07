import { Handle, Position, useNodeConnections, useNodeId } from "@xyflow/react";
import clsx from "clsx";
import NODE_CONFIG from "../constants/node_constants";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useMemo } from "react";

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
    cardinality?: number | "many";
  };
}) {
  const nodeId = useNodeId();
  const connections = useNodeConnections();
  const filteredConnections = useMemo(() => {
    return connections.filter((conn) =>
      position === "left"
        ? conn.targetHandle === handle?.id && conn.target === nodeId
        : conn.sourceHandle === handle?.id && conn.source === nodeId
    );
  }, [connections, handle, position, nodeId]);

  console.log(label, position, filteredConnections);
  const isConnectable = useMemo(() => {
    if (!handle) return true;
    if (handle.cardinality === "many" || !handle.cardinality) {
      return true;
    }
    return filteredConnections.length < handle.cardinality;
  }, [handle, filteredConnections.length]);

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
          isConnectable={isConnectable}
          style={{ backgroundColor: NODE_CONFIG[handle.nodeType].color }}
        />
      )}
    </div>
  );
}

export default NodeColumn;
