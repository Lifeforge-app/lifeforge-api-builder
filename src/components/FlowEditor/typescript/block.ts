export type NodeType = "service" | "controller" | "if" | "map" | "input";

export interface NodeNode {
  id: string;
  type: NodeType;
  data: {
    label: string;
    params?: Record<string, any>;
  };
  position: { x: number; y: number };
}

export interface NodeEdge {
  id: string;
  source: string;
  target: string;
}

export interface NodeGraph {
  nodes: NodeNode[];
  edges: NodeEdge[];
}
