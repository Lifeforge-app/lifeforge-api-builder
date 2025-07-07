import { Icon } from "@iconify/react";
import { useModalStore } from "@lifeforge/ui";
import type { ISchemaNodeData } from "./types";
import FIELD_TYPES from "./constants/field_types";
import NodeConfigButton from "../../components/NodeConfigButton";
import EditSchemaNodeModal from "./components/EditSchemaBlockModal";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import { useTranslation } from "react-i18next";
import type { IDataWithUpdater } from "../../typescript/node";

function SchemaNode({
  data,
}: {
  id: string;
  data: IDataWithUpdater<ISchemaNodeData>;
}) {
  const { t } = useTranslation("core.apiBuilder");
  const open = useModalStore((s) => s.open);

  return (
    <NodeColumnWrapper>
      <NodeConfigButton
        onClick={() => {
          open(EditSchemaNodeModal, {
            schema: data,
            onSave: (updated) => data.onUpdate(updated),
          });
        }}
      />
      <NodeColumn label="Schema Name">
        <NodeTextInput
          value={data.name}
          setValue={(newValue) => {
            data.onUpdate({ name: newValue });
          }}
        />
      </NodeColumn>
      <div className="space-y-1">
        {data.fields.length ? (
          data.fields.map((f, i) => (
            <div
              key={i}
              className="flex justify-between border border-bg-200 dark:border-bg-800 component-bg-lighter p-2 rounded"
            >
              <span className="flex items-center gap-2">
                <Icon
                  icon={
                    FIELD_TYPES.find((t) => t.label.toLowerCase() === f.type)
                      ?.icon || "tabler:abc"
                  }
                  className="size-4 text-bg-500"
                />
                {f.name}
              </span>
              <span className="text-bg-400">
                {f.type}
                {f.isOptional ? "?" : ""}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-bg-500">
            {t("empty.noFields")}
          </p>
        )}
      </div>
      <NodeColumn
        label="Schema"
        position="right"
        handle={{ id: "schema-output", nodeType: "schema" }}
      />
    </NodeColumnWrapper>
  );
}

export default SchemaNode;
