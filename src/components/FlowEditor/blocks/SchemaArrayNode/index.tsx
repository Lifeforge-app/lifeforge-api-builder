import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function SchemaArrayNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Schema"
        handle={{ id: "schema-input", nodeType: "schema", cardinality: 1 }}
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

export default SchemaArrayNode;
