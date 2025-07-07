import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function WithPBNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-input", nodeType: "schema" }}
        position="left"
      />
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-output", nodeType: "schema" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default WithPBNode;
