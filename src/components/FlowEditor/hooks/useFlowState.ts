import { useCallback, useState } from "react";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import NODE_CONFIG, { type NODE_TYPES } from "../nodes";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  nodeData: Record<string, any>;
}

export interface FlowStateActions {
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  onAddNode: (type: NODE_TYPES, position: { x: number; y: number }) => void;
  getNodeData: <T extends Record<string, any>>(id: string) => T;
  updateNodeData: <T extends Record<string, any>>(
    id: string,
    data: T | ((prevData: T) => T)
  ) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setNodeData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export function useFlowState(): FlowState & FlowStateActions {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [nodeData, setNodeData] = useState<Record<string, any>>({});

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onAddNode = useCallback(
    (type: NODE_TYPES, position: { x: number; y: number }) => {
      let data: Record<string, any> = {};
      if ("data" in NODE_CONFIG[type]) {
        data = NODE_CONFIG[type].data || {};
      }

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeData((prevData) => ({
        ...prevData,
        [newNode.id]: data,
      }));
    },
    []
  );

  const getNodeData = useCallback(
    <T extends Record<string, any>>(id: string): T => {
      return nodeData[id] || ({} as T);
    },
    [nodeData]
  );

  const updateNodeData = useCallback(
    <T extends Record<string, any>>(
      id: string,
      data: T | ((prevData: T) => T)
    ): void => {
      if (typeof data === "function") {
        setNodeData((prevData) => ({
          ...prevData,
          [id]: {
            ...prevData[id],
            ...data(prevData[id]),
          },
        }));
        return;
      }

      setNodeData((prevData) => ({
        ...prevData,
        [id]: {
          ...prevData[id],
          ...data,
        },
      }));
    },
    []
  );

  return {
    nodes,
    edges,
    nodeData,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
    getNodeData,
    updateNodeData,
    setNodes,
    setEdges,
    setNodeData,
  };
}
