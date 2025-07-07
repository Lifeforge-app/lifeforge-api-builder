import { useNodeData, useUpdateNodeData } from "../..";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IRouterNodeData } from "./types";

function RouterNode({ id }: { id: string }) {
  const { path } = useNodeData<IRouterNodeData>(id);
  const updateNode = useUpdateNodeData();

  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Router"
        handle={{ id: "router-input", nodeType: "router", cardinality: 1 }}
      />
      <NodeColumn label="Router Path">
        <NodeTextInput
          value={path}
          setValue={(newValue: string) => {
            updateNode(id, { path: newValue });
          }}
          placeholder="/route/path"
        />
      </NodeColumn>
      <NodeColumn
        label="Router"
        position="right"
        handle={{ id: "router-output", nodeType: "router" }}
      />
    </NodeColumnWrapper>
  );
}

export default RouterNode;
