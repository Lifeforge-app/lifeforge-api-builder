import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";
import { useNodeConnections } from "@xyflow/react";
import { useMemo } from "react";
import NodeColumnValueWrapper from "../../components/NodeColumnValueWrapper";
import { type ISchemaField } from "../SchemaNode/types";
import { useTranslation } from "react-i18next";
import { useGetNodeData } from "../../providers/NodeDataProviders";

function SchemaArrayNode({ id }: { id: string }) {
  const { t } = useTranslation("core.apiBuilder");
  const connections = useNodeConnections();
  const getNodeData = useGetNodeData();
  const schemaInputConnections = connections.filter(
    (conn) => conn.targetHandle === "schema-input" && conn.target === id
  );
  const schemaInputData = useMemo(() => {
    if (schemaInputConnections.length === 0) return null;
    const inputSchemaNodeId = schemaInputConnections[0].source;
    return getNodeData<ISchemaField>(inputSchemaNodeId);
  }, [schemaInputConnections, getNodeData]);

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="schemaArray" handle="schema-input">
        {schemaInputData?.name ? (
          <NodeColumnValueWrapper>
            {schemaInputData.name}
          </NodeColumnValueWrapper>
        ) : (
          <p className="text-bg-500 text-center">
            {t("empty.noSchemaConnected")}
          </p>
        )}
      </NodeColumn>
      <NodeColumn nodeType="schemaArray" handle="schema-output" />
    </NodeColumnWrapper>
  );
}

export default SchemaArrayNode;
