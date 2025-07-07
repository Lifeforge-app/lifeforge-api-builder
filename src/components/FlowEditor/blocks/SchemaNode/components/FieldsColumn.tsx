import { Icon } from "@iconify/react/dist/iconify.js";
import NodeColumn from "../../../components/NodeColumn";
import FIELD_TYPES from "../constants/field_types";
import { useTranslation } from "react-i18next";
import type { ISchemaField } from "../types";

function FieldsColumn({ fields }: { fields: ISchemaField[] }) {
  const { t } = useTranslation("core.apiBuilder");

  return (
    <NodeColumn label="Fields">
      <div className="space-y-1">
        {fields.length ? (
          fields.map((f, i) => (
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
    </NodeColumn>
  );
}

export default FieldsColumn;
