import METHOD_COLORS from "./constants/method_colors";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IDataWithUpdater } from "../../typescript/node";
import type { IRouteNodeData } from "./types";
import NodeListbox from "../../components/NodeListbox";
import NodeListboxOption from "../../components/NodeListboxOption";

function RouteNode({
  data: { method, path, onUpdate },
}: {
  data: IDataWithUpdater<IRouteNodeData>;
}) {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Router"
        handle={{
          id: "router-input",
          nodeType: "router",
          cardinality: 1,
        }}
      />
      <NodeColumn label="HTTP Method">
        <NodeListbox
          value={method}
          setValue={(value) => onUpdate({ method: value as typeof method })}
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
            onUpdate({ path: newValue });
          }}
          placeholder="/route/path/:params"
        />
      </NodeColumn>
      <NodeColumn
        label="Route"
        position="right"
        handle={{
          id: "route-output",
          nodeType: "route",
          cardinality: 1,
        }}
      />
    </NodeColumnWrapper>
  );
}

export default RouteNode;
