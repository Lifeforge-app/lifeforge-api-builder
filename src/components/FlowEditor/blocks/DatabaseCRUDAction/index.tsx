import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";

function DatabaseCRUDAction() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Database Action"
        handle={{
          id: "database-operation-input",
          nodeType: "collection",
          cardinality: 1,
        }}
      />
      <NodeColumn
        label="Action"
        handle={{ id: "action-output", nodeType: "service" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default DatabaseCRUDAction;
