import type { IDataWithUpdater } from "../../typescript/node";
import type { IValueNodeData } from "./types";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";
import NodeListbox from "../../components/NodeListbox";
import NodeListboxOption from "../../components/NodeListboxOption";
import { Icon } from "@iconify/react/dist/iconify.js";
import NodeTextInput from "../../components/NodeTextInput";

const DATA_TYPES = [
  {
    label: "String",
    icon: "tabler:abc",
  },
  {
    label: "Number",
    icon: "tabler:number-123",
  },
  {
    label: "Boolean",
    icon: "tabler:toggle-left",
  },
  {
    label: "Array",
    icon: "tabler:list",
  },
];

function ValueNode({
  data: { value, dataType, onUpdate },
}: {
  data: IDataWithUpdater<IValueNodeData>;
}) {
  return (
    <NodeColumnWrapper>
      <NodeColumn label="Data Type">
        <NodeListbox
          value={dataType}
          setValue={(newValue) =>
            onUpdate({ dataType: newValue as IValueNodeData["dataType"] })
          }
          buttonContent={
            <span className="flex items-center gap-2 font-medium text-bg-500">
              <Icon
                icon={
                  DATA_TYPES.find((t) => t.label.toLowerCase() === dataType)
                    ?.icon || "tabler:abc"
                }
                className="size-4"
              />
              {dataType[0].toUpperCase() + dataType.slice(1)}
            </span>
          }
        >
          {DATA_TYPES.map((type) => (
            <NodeListboxOption
              key={type.label}
              value={type.label.toLowerCase()}
            >
              <Icon icon={type.icon} className="size-4" />
              {type.label}
            </NodeListboxOption>
          ))}
        </NodeListbox>
      </NodeColumn>
      <NodeColumn label="Value">
        {
          // TODO
        }
        <NodeTextInput
          value={value}
          setValue={(newValue) => onUpdate({ value: newValue })}
          placeholder={
            dataType === "string"
              ? "Enter a string value"
              : dataType === "number"
              ? "Enter a number"
              : dataType === "boolean"
              ? "true or false"
              : "Enter array values (comma separated)"
          }
        />
      </NodeColumn>
      <NodeColumn
        label="Value"
        handle={{
          id: "value-output",
          nodeType: "value",
        }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default ValueNode;
