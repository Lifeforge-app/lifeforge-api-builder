import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IDataWithUpdater } from "../../typescript/node";
import type { IRouterNodeData } from "./types";

function RouterNode({
  data: { path, onUpdate },
}: {
  data: IDataWithUpdater<IRouterNodeData>;
}) {
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
            onUpdate({ path: newValue });
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
