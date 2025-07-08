import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";

function DatabaseCRUDAction() {
  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="databaseCRUDAction" handle="db-operation-input" />
      <NodeColumn nodeType="databaseCRUDAction" handle="action-output" />
    </NodeColumnWrapper>
  );
}

export default DatabaseCRUDAction;
