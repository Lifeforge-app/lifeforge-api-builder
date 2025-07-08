import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import {
  useNodeData,
  useUpdateNodeData,
} from "../../providers/NodeDataProviders";
import type { IRouterNodeData } from "./types";

function RouterNode({ id }: { id: string }) {
  const { path } = useNodeData<IRouterNodeData>(id);
  const updateNode = useUpdateNodeData();

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="router" handle="router-input" />
      <NodeColumn label="Router Path">
        <NodeTextInput
          value={path}
          setValue={(newValue: string) => {
            updateNode(id, { path: newValue });
          }}
          placeholder="/route/path"
        />
      </NodeColumn>
      <NodeColumn nodeType="router" handle="router-output" />
    </NodeColumnWrapper>
  );
}

export default RouterNode;
