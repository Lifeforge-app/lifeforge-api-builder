import { useEdges, useNodes } from '@xyflow/react'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import { traverseGraph } from '../../utils/traverseGraph'

function ServiceNode({ id }: { id: string }) {
  const nodes = useNodes()
  const edges = useEdges()
  const controllerNode = traverseGraph(nodes, edges, id, [
    { dir: 'in', id: 'controller-input' }
  ])

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="service" handle="controller-input" />
    </NodeColumnWrapper>
  )
}

export default ServiceNode
