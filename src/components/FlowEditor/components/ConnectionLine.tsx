import { useConnection } from "@xyflow/react";
import NODE_CONFIG from "../nodes";
import { useMemo } from "react";

function ConnectionLine({
  fromX,
  fromY,
  toX,
  toY,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}) {
  const { toNode, fromHandle, fromNode } = useConnection();
  const color = useMemo(() => {
    return (
      NODE_CONFIG[
        (fromHandle?.type === "source" ? fromNode : toNode)
          ?.type as keyof typeof NODE_CONFIG
      ]?.color || "gray"
    );
  }, [fromHandle, fromNode, toNode]);

  return (
    <g>
      <path
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
}

export default ConnectionLine;
