import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Connection,
  type Node,
  type NodeChange,
  type EdgeChange,
  useReactFlow,
  type NodeProps,
  type Edge,
  getOutgoers,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, useModalStore } from "@lifeforge/ui";
import NodeSelector from "./components/NodeSelector";
import NODE_CONFIG from "./constants/node_constants";
import { default as NodeComponent } from "./components/Node";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ConnectionLine from "./components/ConnectionLine";
import { default as EdgeComponent } from "./components/Edge";
import usePersonalization from "../../providers/PersonalizationProvider/usePersonalization";

const NODE_TYPES = Object.keys(NODE_CONFIG).reduce((acc, key) => {
  const Component = NODE_CONFIG[key as keyof typeof NODE_CONFIG].component;

  acc[key] = (props: NodeProps) => (
    <NodeComponent {...props} nodeType={key as keyof typeof NODE_CONFIG}>
      <Component {...(props as any)} />
    </NodeComponent>
  );

  return acc;
}, {} as Record<string, React.ComponentType<any>>);

const isValidConnection = (
  connection: Connection | Edge,
  nodes: Node[],
  edges: Edge[]
) => {
  if (!connection.sourceHandle || !connection.targetHandle) {
    return false;
  }

  if (connection.source === connection.target) {
    return false;
  }

  const target = nodes.find((node) => node.id === connection.target);
  const hasCycle = (node: Node, visited = new Set<string>()) => {
    if (visited.has(node.id)) return false;

    visited.add(node.id);

    for (const outgoer of getOutgoers(node, nodes, edges)) {
      if (outgoer.id === connection.source) return true;
      if (hasCycle(outgoer, visited)) return true;
    }
  };

  if (target?.id === connection.source) return false;

  if (hasCycle(target!)) return false;

  const sourceNode = nodes.find((n) => n.id === connection.source);
  const targetNode = nodes.find((n) => n.id === connection.target);

  if (connection.targetHandle.includes("request-schema-input")) {
    return connection.sourceHandle === "request-schema-output";
  }

  if (connection.targetHandle.includes("schema-input")) {
    if (connection.sourceHandle !== "schema-output") return false;

    if (sourceNode?.type === "schemaWithPB") {
      return ["schema", "schemaPickFields"].includes(
        targetNode?.type as string
      );
    }

    if (targetNode?.type === "schemaWithPB") {
      return ["schema", "schemaPickFields"].includes(
        sourceNode?.type as string
      );
    }

    return true;
  }

  if (connection.targetHandle.includes("route-input")) {
    return connection.sourceHandle === "route-output";
  }

  if (connection.targetHandle.includes("router-input")) {
    return connection.sourceHandle === "router-output";
  }

  if (connection.targetHandle.includes("controller-input")) {
    return connection.sourceHandle === "controller-output";
  }

  if (connection.targetHandle.includes("database-operation-input")) {
    return connection.sourceHandle === "database-operation-output";
  }

  if (connection.targetHandle.includes("action-input")) {
    return connection.sourceHandle === "action-output";
  }

  if (connection.targetHandle.includes("collection-input")) {
    return connection.sourceHandle === "collection-output";
  }

  if (connection.targetHandle.includes("filter-input")) {
    return connection.sourceHandle === "filter-output";
  }

  if (connection.targetHandle.includes("sorter-input")) {
    return connection.sourceHandle === "sorter-output";
  }

  if (connection.targetHandle.includes("collection-pick-fields-input")) {
    return connection.sourceHandle === "collection-pick-fields-output";
  }

  if (connection.targetHandle.includes("value-input")) {
    return connection.sourceHandle === "value-output";
  }

  return false;
};

const NodeDataContext = createContext<{
  getNodeData: <T extends Record<string, any>>(id: string) => T;
  updateNodeData: (id: string, data: any) => void;
}>({
  getNodeData: <T extends Record<string, any>>(id: string) => ({} as T),
  updateNodeData: () => {},
});

function FlowEditor() {
  const open = useModalStore((s) => s.open);
  const stack = useModalStore((s) => s.stack);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const { derivedTheme, bgTempPalette } = usePersonalization();
  const [nodeData, setNodeData] = useState<Record<string, any>>({});
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { screenToFlowPosition, toObject } = useReactFlow();

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
    (
      type: keyof typeof NODE_CONFIG,
      position: {
        x: number;
        y: number;
      }
    ) => {
      const data = NODE_CONFIG[type].data
        ? {
            ...NODE_CONFIG[type].data,
          }
        : {};

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
    [setNodes]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === "INPUT" ||
          document.activeElement.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (event.key.toLowerCase() === "a") {
        if (stack.length > 0) {
          return;
        }

        const position = screenToFlowPosition({
          x: mousePosition.current.x,
          y: mousePosition.current.y,
        });
        open(NodeSelector, {
          onSelect: (nodeType: keyof typeof NODE_CONFIG) => {
            onAddNode(nodeType, position);
          },
        });
      }
    },
    [screenToFlowPosition, open, onAddNode, stack]
  );

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, handleMouseMove]);

  useEffect(() => {
    const savedData = localStorage.getItem("flowData");
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
  }, []);

  const getNodeData = useCallback(
    <T extends Record<string, any>>(id: string): T => {
      return nodeData[id] || ({} as T);
    },
    [nodeData]
  );

  const updateNode = useCallback(
    (id: string, data: any) => {
      setNodeData((prevData) => ({
        ...prevData,
        [id]: {
          ...prevData[id],
          ...data,
        },
      }));
    },
    [setNodeData]
  );

  return (
    <NodeDataContext value={{ updateNodeData: updateNode, getNodeData }}>
      <div className="w-screen h-screen bg-bg-100 dark:bg-bg-950">
        <ReactFlow
          colorMode={derivedTheme}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={NODE_TYPES}
          edgeTypes={{
            default: EdgeComponent,
          }}
          connectionLineComponent={ConnectionLine}
          isValidConnection={(connection: Connection | Edge) =>
            isValidConnection(connection, nodes, edges)
          }
          fitView
          snapToGrid
          snapGrid={[20, 20]}
        >
          <Background
            color={
              derivedTheme === "dark" ? bgTempPalette[800] : bgTempPalette[400]
            }
            gap={20}
            offset={20}
            size={2}
          />
          <MiniMap
            nodeStrokeColor={(node: Node) =>
              NODE_CONFIG[node.type as keyof typeof NODE_CONFIG].color ||
              bgTempPalette[500]
            }
            nodeStrokeWidth={5}
            nodeBorderRadius={6}
          />
          <Controls className="bg-bg-800!" />
        </ReactFlow>
        <Button
          icon="uil:save"
          className="absolute top-4 right-4 z-10"
          onClick={() => {
            const json: Record<string, any> = toObject();
            json.nodeData = nodeData;
            localStorage.setItem("flowData", JSON.stringify(json));
            toast.success("Flow saved successfully!");
          }}
        >
          Save Flow
        </Button>
      </div>
    </NodeDataContext>
  );
}

function FlowEditorWrapper() {
  return (
    <ReactFlowProvider>
      <FlowEditor />
    </ReactFlowProvider>
  );
}

export function useGetNodeData() {
  const context = useContext(NodeDataContext);
  if (!context) {
    throw new Error("useGetNodeData must be used within NodeDataContext");
  }
  return context.getNodeData;
}

export function useUpdateNodeData() {
  const context = useContext(NodeDataContext);
  if (!context) {
    throw new Error("useUpdateNode must be used within UpdateNodeContext");
  }
  return context.updateNodeData;
}

export function useNodeData<T extends Record<string, any>>(id: string): T {
  const context = useContext(NodeDataContext);
  if (!context) {
    throw new Error("useGetNodeData must be used within NodeDataContext");
  }
  return context.getNodeData<T>(id);
}

export default FlowEditorWrapper;
