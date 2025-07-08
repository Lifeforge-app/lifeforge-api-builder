import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function GetFullListNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="getFullList" handle="collection-input" />
      <NodeColumn nodeType="getFullList" handle="filter-input" />
      <NodeColumn nodeType="getFullList" handle="sorter-input" />
      <NodeColumn
        nodeType="getFullList"
        handle="collection-pick-fields-input"
      />
      <NodeColumn nodeType="getFullList" handle="db-operation-output" />
    </NodeColumnWrapper>
  );
}

export default GetFullListNode;
