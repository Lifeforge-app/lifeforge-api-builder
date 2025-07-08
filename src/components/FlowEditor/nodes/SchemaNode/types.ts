export interface ISchemaField {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "array" | "enum";
  isOptional?: boolean;
  defaultValue?: any;
}

export interface ISchemaNodeData {
  name: string;
  fields: ISchemaField[];
}

export interface ISchemaNodeNode {
  id: string;
  type: "schema";
  position: { x: number; y: number };
  data: ISchemaNodeData;
}
