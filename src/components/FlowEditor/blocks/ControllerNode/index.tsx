import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function ControllerNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Route"
        handle={{ id: "route-input", nodeType: "route" }}
      />
      <NodeColumn
        label="Request Schema"
        handle={{ id: "request-schema-input", nodeType: "requestSchema" }}
      />
      <NodeColumn
        label="Response Schema"
        handle={{ id: "schema-input", nodeType: "schema" }}
        position="left"
      />
      <NodeColumn
        label="Controller"
        handle={{ id: "controller-output", nodeType: "controller" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default ControllerNode;
