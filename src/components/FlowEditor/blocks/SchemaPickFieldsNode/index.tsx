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
import FieldsColumn from "../SchemaNode/components/FieldsColumn";

function SchemaPickFieldsNode({ id }: { id: string }) {
  const { t } = useTranslation("core.apiBuilder");
  const { fieldIds, fields } = useNodeData<IPickFieldsFromSchemaNodeData>(id);
  const updateNodeData = useUpdateNodeData();
  const getNodeData = useGetNodeData();
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
      updateNodeData(id, { fieldIds: [], fields: [] });
      return;
    }

    updateNodeData<IPickFieldsFromSchemaNodeData>(id, (prevData) => {
      const newFieldIds = prevData.fieldIds.filter((fieldId) =>
        inputSchemaData.fields.some((field) => field.name === fieldId)
      );
      return {
        ...prevData,
        fieldIds: newFieldIds,
        fields: inputSchemaData.fields.filter((field) =>
          newFieldIds.includes(field.name)
        ),
      };
    });
  }, [inputSchemaData, id, updateNodeData]);

  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-input", nodeType: "schema", cardinality: 1 }}
        position="left"
      />
      <NodeColumn label="Field IDs">
        {inputSchemaData ? (
          inputSchemaData.fields.length > 0 ? (
            <NodeListbox
              multiple
              value={fieldIds}
              setValue={(value: string[]) =>
                updateNodeData(id, {
                  fieldIds: value,
                  fields: inputSchemaData.fields.filter((field) =>
                    value.includes(field.name)
                  ),
                })
              }
            >
              {inputSchemaData.fields.map((field) => (
                <NodeListboxOption key={field.name} value={field.name}>
                  <div
                    className={clsx(
                      "flex flex-between w-full",
                      fieldIds.includes(field.name) &&
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
                    {fieldIds.includes(field.name) && (
                      <Icon icon="tabler:check" />
                    )}
                  </div>
                </NodeListboxOption>
              ))}
            </NodeListbox>
          ) : (
            <p className="text-center text-bg-500">
              {t("empty.noFieldsInSchema")}
            </p>
          )
        ) : (
          <p className="text-center text-bg-500">
            {t("empty.noSchemaConnected")}
          </p>
        )}
      </NodeColumn>
      <FieldsColumn fields={fields} />
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-output", nodeType: "schema" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default SchemaPickFieldsNode;
