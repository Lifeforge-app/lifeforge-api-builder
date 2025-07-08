import { useEdges, useNodeConnections, useNodes } from "@xyflow/react";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import { useEffect, useMemo } from "react";
import type { IFilterNodeData } from "./types";
import { useTranslation } from "react-i18next";
import NodeListbox from "../../components/NodeListbox";
import type { ICollectionNodeData } from "../CollectionNode/types";
import NodeListboxOption from "../../components/NodeListboxOption";
import { traverseGraph } from "../../../../utils/traverseGraph";
import { useGetNodeData, useNodeData, useUpdateNodeData } from "../..";

const OPERATIONS = [
  { value: "=", label: "Equals" },
  { value: "!=", label: "Not Equals" },
  { value: ">", label: "Greater Than" },
  { value: "<", label: "Less Than" },
  { value: ">=", label: "Greater Than or Equal To" },
  { value: "<=", label: "Less Than or Equal To" },
  { value: "~", label: "Contains" },
  { value: "!~", label: "Does Not Contain" },
];

function FilterNode({ id }: { id: string }) {
  const { t } = useTranslation("core.apiBuilder");
  const getNodeData = useGetNodeData();
  const { columnName, comparator } = useNodeData<IFilterNodeData>(id);
  const updateNode = useUpdateNodeData();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const connections = useNodeConnections();
  const outputConnections = useMemo(
    () =>
      connections.filter(
        (conn) => conn.sourceHandle === "filter-output" && conn.source === id
      ),
    [connections, id]
  );

  const targetCollection = useMemo(() => {
    if (outputConnections.length === 0) return null;
    const startId = outputConnections[0].target;

    return traverseGraph(allNodes, allEdges, startId, [
      { dir: "in", type: "collection" },
    ]);
  }, [outputConnections, allNodes, allEdges]);

  const selectableColumns = useMemo(() => {
    if (!targetCollection) return [];

    const collectionNodeData = getNodeData<ICollectionNodeData>(
      targetCollection.id
    );
    return collectionNodeData.fields;
  }, [targetCollection, getNodeData]);

  const targetRequestSchema = useMemo(() => {
    if (outputConnections.length === 0) return null;
    const startId = outputConnections[0].target; // 连接到 Filter 输出的第一个目标节点 ID

    return traverseGraph(allNodes, allEdges, startId, [
      { dir: "out", type: "databaseCRUDAction" },
      { dir: "out", type: "service" },
      { dir: "in", type: "controller" },
      { dir: "in", type: "requestSchema" },
    ]);
  }, [outputConnections, allNodes, allEdges]);

  useEffect(() => {
    if (!targetCollection) {
      updateNode(id, { columnName: "", comparator: "" });
      return;
    }
  }, [targetCollection, id, updateNode]);

  return (
    <NodeColumnWrapper>
      {targetCollection ? (
        <>
          <NodeColumn label="Field">
            <NodeListbox
              value={columnName}
              setValue={(value) => updateNode(id, { columnName: value })}
            >
              {selectableColumns.map((field) => (
                <NodeListboxOption key={field.name} value={field.name}>
                  {field.name}
                </NodeListboxOption>
              ))}
            </NodeListbox>
          </NodeColumn>
          <NodeColumn label="Comparator">
            <NodeListbox
              value={comparator}
              setValue={(value) => updateNode(id, { comparator: value })}
              buttonContent={
                <>
                  {OPERATIONS.find((op) => op.value === comparator)?.label} (
                  {comparator})
                </>
              }
            >
              {OPERATIONS.map((op) => (
                <NodeListboxOption key={op.value} value={op.value}>
                  <span className="whitespace-nowrap">
                    {op.label} ({op.value})
                  </span>
                </NodeListboxOption>
              ))}
            </NodeListbox>
          </NodeColumn>
        </>
      ) : (
        <p className="text-sm text-center text-bg-500">
          {t("empty.noCollectionConnected")}
        </p>
      )}
      <NodeColumn
        label="Value"
        handle={{
          id: "value-input",
          nodeType: "value",
          cardinality: 1,
        }}
      />
      <NodeColumn
        label="Filter"
        handle={{
          id: "filter-output",
          nodeType: "filter",
          cardinality: 1,
        }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default FilterNode;
