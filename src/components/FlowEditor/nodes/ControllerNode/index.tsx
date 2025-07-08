import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";
import { useMemo } from "react";
import { useNodeConnections } from "@xyflow/react";
import type { IRouteNodeData } from "../RouteNode/types";
import NodeColumnValueWrapper from "../../components/NodeColumnValueWrapper";
import METHOD_COLORS from "../RouteNode/constants/method_colors";
import { useGetNodeData } from "../../providers/NodeDataProviders";

function ControllerNode({ id }: { id: string }) {
  const connections = useNodeConnections();
  const getNodeData = useGetNodeData();
  const routeInputConnections = useMemo(
    () =>
      connections.filter(
        (conn) => conn.targetHandle === "route-input" && conn.target === id
      ),
    [connections, id]
  );
  const routeInputSchemaData = useMemo(() => {
    if (routeInputConnections.length === 0) return null;
    const inputSchemaNodeId = routeInputConnections[0].source;
    return getNodeData<IRouteNodeData>(inputSchemaNodeId);
  }, [routeInputConnections, getNodeData]);

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="controller" handle="route-input">
        {routeInputSchemaData && (
          <NodeColumnValueWrapper>
            <div className="flex items-center gap-2 w-full min-w-0">
              <span
                style={{
                  backgroundColor:
                    METHOD_COLORS[routeInputSchemaData.method][500],
                }}
                className="size-2 rounded-full shrink-0"
              />
              <span className="text-bg-500">
                {routeInputSchemaData.method.toUpperCase()}{" "}
              </span>
              <span className="w-full truncate min-w-0">
                {routeInputSchemaData.path}
              </span>
            </div>
          </NodeColumnValueWrapper>
        )}
      </NodeColumn>
      <NodeColumn nodeType="controller" handle="request-schema-input" />
      <NodeColumn nodeType="controller" handle="response-schema-input" />
      <NodeColumn nodeType="controller" handle="controller-output" />
    </NodeColumnWrapper>
  );
}

export default ControllerNode;
