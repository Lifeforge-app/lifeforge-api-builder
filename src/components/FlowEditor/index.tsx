import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ConnectionLine from "./components/ConnectionLine";
import { default as EdgeComponent } from "./components/Edge";
import usePersonalization from "../../providers/PersonalizationProvider/usePersonalization";
import { isValidConnection } from "./utils/isValidConnection";
import { NodeDataContext } from "./providers/NodeDataProviders";
import { useFlowState } from "./hooks/useFlowState";
import { useFlowKeyboardHandlers } from "./hooks/useFlowKeyboardHandlers";
import { useFlowPersistence } from "./hooks/useFlowPersistence";
import { createNodeTypes } from "./utils/createNodeTypes";
import { SaveButton } from "./components/SaveButton";
import NODE_CONFIG, { type NODE_TYPES } from "./nodes";

const NODE_TYPES = createNodeTypes();

function FlowEditor() {
  const { derivedTheme, bgTempPalette } = usePersonalization();
  const flowState = useFlowState();
  useFlowPersistence({
    setNodes: flowState.setNodes,
    setEdges: flowState.setEdges,
    setNodeData: flowState.setNodeData,
  });

  useFlowKeyboardHandlers({
    onAddNode: flowState.onAddNode,
  });

  return (
    <NodeDataContext
      value={{
        updateNodeData: flowState.updateNodeData,
        getNodeData: flowState.getNodeData,
      }}
    >
      <div className="w-screen h-screen bg-bg-100 dark:bg-bg-950">
        <ReactFlow
          colorMode={derivedTheme}
          nodes={flowState.nodes}
          edges={flowState.edges}
          onNodesChange={flowState.onNodesChange}
          onEdgesChange={flowState.onEdgesChange}
          onConnect={flowState.onConnect}
          nodeTypes={NODE_TYPES}
          edgeTypes={{
            default: EdgeComponent,
          }}
          connectionLineComponent={ConnectionLine}
          isValidConnection={(connection: Connection | Edge) =>
            isValidConnection(connection, flowState.nodes, flowState.edges)
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
              NODE_CONFIG[node.type as NODE_TYPES].color || bgTempPalette[500]
            }
            nodeStrokeWidth={5}
            nodeBorderRadius={6}
          />
          <Controls className="bg-bg-800!" />
        </ReactFlow>
        <SaveButton nodeData={flowState.nodeData} />
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

export default FlowEditorWrapper;
