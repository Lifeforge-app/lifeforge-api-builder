import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";

function ServiceNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Controller"
        handle={{ id: "controller-input", nodeType: "controller" }}
        position="left"
      />
    </NodeColumnWrapper>
  );
}

export default ServiceNode;
