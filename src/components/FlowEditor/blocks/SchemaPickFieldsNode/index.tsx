import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IDataWithUpdater } from "../../typescript/node";
import type { IPickFieldsFromSchemaNodeData } from "./types";

// TODO change to dynamic selection of fields from schema
function SchemaPickFieldsNode({
  data: { fields, onUpdate },
}: {
  data: IDataWithUpdater<IPickFieldsFromSchemaNodeData>;
}) {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-input", nodeType: "schema", cardinality: 1 }}
        position="left"
      />
      <NodeColumn label="Fields">
        <NodeTextInput
          value={fields.join(", ")}
          setValue={(newValue: string) => {
            const newFields = newValue
              .split(",")
              .map((f) => f.trim())
              .filter((f) => f);
            onUpdate({ fields: newFields });
          }}
          placeholder="field1, field2"
        />
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
