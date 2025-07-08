import { Handle, Position, useNodeConnections, useNodeId } from "@xyflow/react";
import clsx from "clsx";
import NODE_CONFIG from "../nodes";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useMemo } from "react";
import type { IHandler } from "../typescript/node";

type NodeType = keyof typeof NODE_CONFIG;
type NodeHandlers<T extends NodeType> = (typeof NODE_CONFIG)[T]["handlers"];
type NodeHandlerKey<T extends NodeType> = keyof NodeHandlers<T>;

type NodeColumnProps<T extends NodeType> =
  | {
      nodeType: T;
      handle: NodeHandlerKey<T>;
      label?: string;
      children?: React.ReactNode;
    }
  | {
      nodeType?: never;
      handle?: never;
      label: string;
      children?: React.ReactNode;
    };

function NodeColumn<T extends NodeType>({
  nodeType,
  handle,
  label,
  children,
}: NodeColumnProps<T>) {
  const nodeId = useNodeId();
  const connections = useNodeConnections();

  const handler = useMemo(() => {
    if (!nodeType || !handle) return undefined;

    const handlers = NODE_CONFIG[nodeType].handlers;
    if (handle in handlers) {
      return handlers[handle as keyof typeof handlers] as IHandler;
    }

    return undefined;
  }, [nodeType, handle]);

  const isInput = useMemo(() => {
    return handle ? (handle as string).endsWith("input") : true;
  }, [handle]);

  const filteredConnections = useMemo(() => {
    if (!handle) return [];

    return connections.filter((conn) =>
      isInput
        ? conn.targetHandle === handle && conn.target === nodeId
        : conn.sourceHandle === handle && conn.source === nodeId
    );
  }, [handle, nodeId, connections, isInput]);

  const isConnectable = useMemo(() => {
    if (!handler) return true;
    if (handler.cardinality === "many" || !handler.cardinality) {
      return true;
    }
    return filteredConnections.length < handler.cardinality;
  }, [handler, filteredConnections.length]);

  const { t } = useTranslation("core.apiBuilder");

  if (!handler?.label && !label) {
    return <></>;
  }

  return (
    <div className="space-y-1 relative">
      <label
        className={clsx(
          "text-sm block font-medium text-bg-500 w-full",
          isInput ? "text-left" : "text-right"
        )}
      >
        {t([
          ...(handler?.label
            ? [
                `nodes.${_.camelCase(handler.label)}`,
                `nodeColumns.${_.camelCase(handler.label)}`,
                handler.label,
              ]
            : []),
          ...(label
            ? [
                `nodes.${_.camelCase(label)}`,
                `nodeColumns.${_.camelCase(label)}`,
                label,
              ]
            : []),
        ])}
      </label>
      {children && <div>{children}</div>}
      {handler && handle && (
        <Handle
          type={isInput ? "target" : "source"}
          position={isInput ? Position.Left : Position.Right}
          id={handle as string}
          className={clsx(
            "size-3! rounded-full border border-bg-200 dark:border-bg-900 top-2.5!",
            isInput ? "-left-3! right-auto!" : "-right-3!"
          )}
          isConnectable={isConnectable}
          style={{ backgroundColor: NODE_CONFIG[handler.nodeType].color }}
        />
      )}
    </div>
  );
}

export default NodeColumn;
