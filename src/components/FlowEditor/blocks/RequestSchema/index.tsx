import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function RequestSchema() {
  return (
    <NodeColumnWrapper>
      {["Params", "Query", "Body"].map((type) => (
        <NodeColumn
          key={type}
          label={`${type}`}
          handle={{
            id: `${type.toLowerCase()}-schema-input`,
            nodeType: "schema",
          }}
        />
      ))}
      <NodeColumn
        label="Request Schema"
        handle={{ id: "request-schema-output", nodeType: "requestSchema" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default RequestSchema;
