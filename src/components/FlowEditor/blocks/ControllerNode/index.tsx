import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function ControllerNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Route"
        handle={{ id: "route-input", nodeType: "route", cardinality: 1 }}
      />
      <NodeColumn
        label="Request Schema"
        handle={{
          id: "request-schema-input",
          nodeType: "requestSchema",
          cardinality: 1,
        }}
      />
      <NodeColumn
        label="Response Schema"
        handle={{ id: "schema-input", nodeType: "schema", cardinality: 1 }}
        position="left"
      />
      <NodeColumn
        label="Controller"
        handle={{
          id: "controller-output",
          nodeType: "controller",
          cardinality: 1,
        }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default ControllerNode;
