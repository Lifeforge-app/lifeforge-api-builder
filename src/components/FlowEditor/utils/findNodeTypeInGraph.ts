import { type Edge, type Node, getIncomers, getOutgoers } from '@xyflow/react'

export function findNodeTypeInGraph(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  targetType: string
): Node | null {
  const startNode = nodes.find(node => node.id === startNodeId)
  if (!startNode) return null

  if (startNode.type === targetType) return startNode

  const visited = new Set<string>()
  const queue: Node[] = [startNode]
  visited.add(startNode.id)

  while (queue.length > 0) {
    const currentNode = queue.shift()!

    const connectedNodes = [
      ...getIncomers(currentNode, nodes, edges),
      ...getOutgoers(currentNode, nodes, edges)
    ]

    for (const connectedNode of connectedNodes) {
      if (visited.has(connectedNode.id)) continue

      visited.add(connectedNode.id)

      if (connectedNode.type === targetType) {
        return connectedNode
      }

      queue.push(connectedNode)
    }
  }

  return null
}
