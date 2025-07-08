import { type Edge, type Node, getIncomers, getOutgoers } from '@xyflow/react'

export type Direction = 'out' | 'in'

export interface StepDescriptor {
  dir: Direction
  type: string
}

export function traverseGraph(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  path: StepDescriptor[]
): Node | null {
  let current = nodes.find(n => n.id === startNodeId)
  if (!current) return null

  for (const step of path) {
    const nextCandidates: Node[] =
      step.dir === 'out'
        ? getOutgoers(current, nodes, edges)
        : getIncomers(current, nodes, edges)

    current = nextCandidates.find(n => n.type === step.type) || undefined
    if (!current) return null
  }

  return current
}
