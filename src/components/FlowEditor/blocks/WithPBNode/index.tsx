import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";
import type { ISchemaField, ISchemaNodeData } from "../SchemaNode/types";
import NodeTextInput from "../../components/NodeTextInput";
import { useNodeConnections } from "@xyflow/react";
import { useEffect, useMemo } from "react";
import FieldsColumn from "../SchemaNode/components/FieldsColumn";
import { useTranslation } from "react-i18next";
import { useGetNodeData, useNodeData, useUpdateNodeData } from "../..";

const PB_SCHEMA: ISchemaField[] = [
  { name: "id", type: "string", isOptional: false },
  { name: "created", type: "date", isOptional: false },
  { name: "updated", type: "date", isOptional: false },
  { name: "collectionId", type: "string", isOptional: false },
  { name: "collectionName", type: "string", isOptional: false },
];

function WithPBNode({ id }: { id: string }) {
  const updateNode = useUpdateNodeData();
  const { name, fields } = useNodeData<ISchemaNodeData>(id);
  const getNodeData = useGetNodeData();
  const { t } = useTranslation("core.apiBuilder");
  const connections = useNodeConnections();
  const inputConnections = useMemo(
    () =>
      connections.filter(
        (conn) => conn.targetHandle === "schema-input" && conn.target === id
      ),
    [connections, id]
  );
  const inputSchemaData = useMemo(() => {
    if (inputConnections.length === 0) return null;
    const inputSchemaNodeId = inputConnections[0].source;
    return getNodeData<ISchemaNodeData>(inputSchemaNodeId);
  }, [inputConnections, getNodeData]);

  useEffect(() => {
    if (!inputSchemaData) {
      updateNode(id, { fields: [], name: "SchemaWithPB" });
    } else {
      updateNode(id, {
        name: `${inputSchemaData.name || "Schema"}WithPB`,
        fields: [...inputSchemaData.fields, ...PB_SCHEMA],
      });
    }
  }, [inputSchemaData, id, updateNode]);

  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{
          id: "schema-input",
          nodeType: "schema",
          cardinality: 1,
        }}
        position="left"
      />
      {inputSchemaData ? (
        <>
          <NodeColumn label="Schema Name">
            <NodeTextInput value={name} disabled />
          </NodeColumn>
          <FieldsColumn fields={fields} />
        </>
      ) : (
        <p className="text-bg-500 text-center">
          {t("empty.noSchemaConnected")}
        </p>
      )}
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-output", nodeType: "schema" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default WithPBNode;
