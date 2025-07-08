import { useEffect } from "react";
import type { Node } from "@xyflow/react";
import type { FlowStateActions } from "./useFlowState";

const STORAGE_KEY = "flowData";

interface UseFlowPersistenceProps {
  setNodes: FlowStateActions["setNodes"];
  setEdges: FlowStateActions["setEdges"];
  setNodeData: FlowStateActions["setNodeData"];
}

export function useFlowPersistence({
  setNodes,
  setEdges,
  setNodeData,
}: UseFlowPersistenceProps) {
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const flowData = JSON.parse(savedData);
        if (flowData.nodes && flowData.edges) {
          setNodes(
            flowData.nodes.map((node: Node) => ({
              ...node,
            }))
          );
          setNodeData(flowData.nodeData || {});
          setEdges(flowData.edges);
        }
      } catch (error) {
        console.error("Failed to parse saved flow data:", error);
      }
    }
  }, [setNodes, setEdges, setNodeData]);
}
