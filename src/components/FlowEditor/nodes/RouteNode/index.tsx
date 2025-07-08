import METHOD_COLORS from "./constants/method_colors";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IRouteNodeData } from "./types";
import NodeListbox from "../../components/NodeListbox";
import NodeListboxOption from "../../components/NodeListboxOption";
import {
  useNodeData,
  useUpdateNodeData,
} from "../../providers/NodeDataProviders";

function RouteNode({ id }: { id: string }) {
  const { method, path } = useNodeData<IRouteNodeData>(id);
  const updateNode = useUpdateNodeData();

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="route" handle="router-input" />
      <NodeColumn label="HTTP Method">
        <NodeListbox
          value={method}
          setValue={(value) =>
            updateNode(id, { method: value as typeof method })
          }
          buttonContent={
            <span className="flex items-center gap-2 font-medium text-bg-500">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: METHOD_COLORS[method]?.[500] || "#ccc",
                }}
              />
              {method}
            </span>
          }
        >
          {Object.entries(METHOD_COLORS).map(([method, color]) => (
            <NodeListboxOption key={method} value={method}>
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: color[500] || "#ccc",
                }}
              />
              {method}
            </NodeListboxOption>
          ))}
        </NodeListbox>
      </NodeColumn>
      <NodeColumn label="Route Path">
        <NodeTextInput
          value={path}
          setValue={(newValue) => {
            updateNode(id, { path: newValue });
          }}
          placeholder="/route/path/:params"
        />
      </NodeColumn>
      <NodeColumn nodeType="route" handle="route-output" />
    </NodeColumnWrapper>
  );
}

export default RouteNode;
