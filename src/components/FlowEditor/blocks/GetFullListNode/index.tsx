import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeColumn from "../../components/NodeColumn";

function GetFullListNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Collection"
        handle={{
          id: "collection-input",
          nodeType: "collection",
          cardinality: 1,
        }}
      />
      <NodeColumn
        label="Filter"
        handle={{ id: "filter-input", nodeType: "filter" }}
        position="left"
      />
      <NodeColumn
        label="Sorter"
        handle={{ id: "sort-input", nodeType: "sorter" }}
        position="left"
      />
      <NodeColumn
        label="Collection Pick Fields"
        handle={{ id: "fields-input", nodeType: "collectionPickFields" }}
        position="left"
      />
      <NodeColumn
        label="Database Action"
        handle={{ id: "database-operation-output", nodeType: "getFullList" }}
        position="right"
      />
    </NodeColumnWrapper>
  );
}

export default GetFullListNode;
