import { useModalStore } from "@lifeforge/ui";
import type { ISchemaNodeData } from "./types";
import NodeConfigButton from "../../components/NodeConfigButton";
import EditSchemaNodeModal from "./components/EditSchemaBlockModal";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import FieldsColumn from "./components/FieldsColumn";
import {
  useNodeData,
  useUpdateNodeData,
} from "../../providers/NodeDataProviders";

function SchemaNode({ id }: { id: string }) {
  const data = useNodeData<ISchemaNodeData>(id);
  const open = useModalStore((s) => s.open);
  const updateNode = useUpdateNodeData();

  return (
    <NodeColumnWrapper>
      <NodeConfigButton
        onClick={() => {
          open(EditSchemaNodeModal, {
            schema: data,
            onSave: (updated) => updateNode(id, updated),
          });
        }}
      />
      <NodeColumn label="Schema Name">
        <NodeTextInput
          value={data.name}
          setValue={(newValue) => {
            updateNode(id, { name: newValue });
          }}
        />
      </NodeColumn>
      <FieldsColumn fields={data.fields} />
      <NodeColumn nodeType="schema" handle="schema-output" />
    </NodeColumnWrapper>
  );
}

export default SchemaNode;
