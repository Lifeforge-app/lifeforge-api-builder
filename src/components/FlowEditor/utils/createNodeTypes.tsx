import React from "react";
import { type NodeProps } from "@xyflow/react";
import { default as NodeComponent } from "../components/Node";
import NODE_CONFIG from "../nodes";

export function createNodeTypes(): Record<
  string,
  React.ComponentType<NodeProps>
> {
  const nodeTypes: Record<string, React.ComponentType<NodeProps>> = {};

  Object.keys(NODE_CONFIG).forEach((key) => {
    const Component = NODE_CONFIG[key as keyof typeof NODE_CONFIG].component;

    nodeTypes[key] = (props: NodeProps) => (
      <NodeComponent {...props} nodeType={key as keyof typeof NODE_CONFIG}>
        <Component {...(props as any)} />
      </NodeComponent>
    );
  });

  return nodeTypes;
}
