import {
  BaseEdge,
  getBezierPath,
  useNodes,
  type EdgeProps,
} from "@xyflow/react";
import { useMemo } from "react";
import NODE_CONFIG from "../nodes";

function Edge({
  source,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const nodes = useNodes();
  const sourceNode = useMemo(
    () => nodes.find((node) => node.id === source),
    [nodes, source]
  );
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        stroke:
          NODE_CONFIG[sourceNode?.type as keyof typeof NODE_CONFIG]?.color ||
          "gray",
      }}
    />
  );
}

export default Edge;
