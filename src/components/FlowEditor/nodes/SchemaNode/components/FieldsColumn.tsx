import { Icon } from "@iconify/react/dist/iconify.js";
import NodeColumn from "../../../components/NodeColumn";
import FIELD_TYPES from "../constants/field_types";
import { useTranslation } from "react-i18next";
import type { ISchemaField } from "../types";
import NodeColumnValueWrapper from "../../../components/NodeColumnValueWrapper";
import { Fragment } from "react/jsx-runtime";

function FieldsColumn({
  fields,
  withLabel = true,
  withEmptyMessage = true,
}: {
  fields: ISchemaField[];
  withLabel?: boolean;
  withEmptyMessage?: boolean;
}) {
  const { t } = useTranslation("core.apiBuilder");
  const FinalComponent = withLabel ? NodeColumn : Fragment;

  return (
    <FinalComponent label="Fields">
      <div className="space-y-1.5">
        {fields.length
          ? fields.map((f, i) => (
              <NodeColumnValueWrapper key={i}>
                <div className="flex-between gap-3 w-full">
                  <span className="flex items-center gap-2">
                    <Icon
                      icon={
                        FIELD_TYPES.find(
                          (t) => t.label.toLowerCase() === f.type
                        )?.icon || "tabler:abc"
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
              </NodeColumnValueWrapper>
            ))
          : withEmptyMessage && (
              <p className="text-sm text-center text-bg-500">
                {t("empty.noFields")}
              </p>
            )}
      </div>
    </FinalComponent>
  );
}

export default FieldsColumn;
