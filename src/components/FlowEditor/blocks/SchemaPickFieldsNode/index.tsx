import { useNodeConnections } from "@xyflow/react";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import type { IPickFieldsFromSchemaNodeData } from "./types";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import NodeListbox from "../../components/NodeListbox";
import NodeListboxOption from "../../components/NodeListboxOption";
import type { ISchemaNodeData } from "../SchemaNode/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import FIELD_TYPES from "../SchemaNode/constants/field_types";
import { useGetNodeData, useNodeData, useUpdateNodeData } from "../..";

function SchemaPickFieldsNode({ id }: { id: string }) {
  const { t } = useTranslation("core.apiBuilder");
  const { fields } = useNodeData<IPickFieldsFromSchemaNodeData>(id);
  const updateNode = useUpdateNodeData();
  const getNodeData = useGetNodeData();
  const connections = useNodeConnections();
  const inputSchemaNodeId = useMemo(() => {
    const inputSchemaNodeConnections = connections.filter(
      (c) => c.targetHandle === "schema-input" && c.target === id
    );
    if (inputSchemaNodeConnections.length === 0) return null;
    return inputSchemaNodeConnections[0].source;
  }, [connections, id]);

  const availableFields = useMemo(() => {
    if (!inputSchemaNodeId) return [];
    const inputSchemaNodeData = getNodeData<ISchemaNodeData>(inputSchemaNodeId);
    return inputSchemaNodeData?.fields || [];
  }, [inputSchemaNodeId, getNodeData]);

  useEffect(() => {
    if (!inputSchemaNodeId || !availableFields.length) {
      updateNode(id, { fields: [] });
    }
  }, [inputSchemaNodeId, id, updateNode, availableFields.length]);

  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-input", nodeType: "schema", cardinality: 1 }}
        position="left"
      />
      <NodeColumn label="Fields">
        {inputSchemaNodeId ? (
          <NodeListbox
            multiple
            value={fields}
            setValue={(value: string[]) => updateNode(id, { fields: value })}
          >
            {availableFields.map((field) => (
              <NodeListboxOption key={field.name} value={field.name}>
                <div
                  className={clsx(
                    "flex flex-between w-full",
                    fields.includes(field.name) &&
                      "text-bg-900 dark:text-bg-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={
                        FIELD_TYPES.find(
                          (t) => t.label.toLowerCase() === field.type
                        )?.icon || "tabler:abc"
                      }
                      className="size-4 text-bg-500"
                    />
                    {field.name}
                  </div>
                  {fields.includes(field.name) && <Icon icon="tabler:check" />}
                </div>
              </NodeListboxOption>
            ))}
          </NodeListbox>
        ) : (
          <p className="text-center text-bg-500">
            {t("empty.noSchemaConnected")}
          </p>
        )}
      </NodeColumn>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-output", nodeType: "schema" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default SchemaPickFieldsNode;
