import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";

function ServiceNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="service" handle="controller-input" />
      <NodeColumn nodeType="service" handle="action-input" />
    </NodeColumnWrapper>
  );
}

export default ServiceNode;
