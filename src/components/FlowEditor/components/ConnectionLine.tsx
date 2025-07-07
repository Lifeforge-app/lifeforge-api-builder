import { useConnection } from "@xyflow/react";
import NODE_CONFIG from "../constants/node_constants";

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
  const { fromNode } = useConnection();

  return (
    <g>
      <path
        fill="none"
        stroke={
          NODE_CONFIG[fromNode?.type as keyof typeof NODE_CONFIG]?.color ||
          "gray"
        }
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={
          NODE_CONFIG[fromNode?.type as keyof typeof NODE_CONFIG]?.color ||
          "gray"
        }
        strokeWidth={1.5}
      />
    </g>
  );
}

export default ConnectionLine;
