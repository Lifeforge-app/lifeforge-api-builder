import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react'
import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange
} from '@xyflow/react'
import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import NODE_CONFIG, { type NODE_TYPES } from '../nodes'

export interface FlowState {
  nodes: Node[]
  edges: Edge[]
  nodeData: Record<string, any>
  ready: boolean
}

export interface FlowStateActions {
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (params: Connection) => void
  onAddNode: (
    type: NODE_TYPES | 'group',
    position: { x: number; y: number },
    size?: { width: number; height: number }
  ) => string
  getNodeData: <T extends Record<string, any>>(id: string) => T
  updateNodeData: <T extends Record<string, any>>(
    id: string,
    data: T | ((prevData: T) => T)
  ) => void
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
  setNodeData: React.Dispatch<React.SetStateAction<Record<string, any>>>
  setReady: (ready: boolean) => void
}

export function useFlowState(): FlowState & FlowStateActions {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [nodeData, setNodeData] = useState<Record<string, any>>({})
  const [ready, setReady] = useState(false)

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes(nds => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges(eds => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge(params, eds))
  }, [])

  const onAddNode = useCallback(
    (
      type: NODE_TYPES | 'group',
      position: { x: number; y: number },
      size?: { width: number; height: number }
    ) => {
      if (type === 'group') {
        const newNode: Node = {
          id: `group-${uuidv4()}`,
          type: 'group',
          position,
          data: {},
          width: size?.width || 200,
          height: size?.height || 100
        }

        setNodes(nds => nds.concat(newNode))
        return newNode.id
      }

      let data: Record<string, any> = {}
      if ('data' in NODE_CONFIG[type]) {
        data = NODE_CONFIG[type].data || {}
      }

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: {}
      }

      setNodes(nds => nds.concat(newNode))
      setNodeData(prevData => ({
        ...prevData,
        [newNode.id]: data
      }))

      return newNode.id
    },
    []
  )

  const getNodeData = useCallback(
    <T extends Record<string, any>>(id: string): T => {
      return nodeData[id] || ({} as T)
    },
    [nodeData]
  )

  const updateNodeData = useCallback(
    <T extends Record<string, any>>(
      id: string,
      data: T | ((prevData: T) => T)
    ): void => {
      if (typeof data === 'function') {
        setNodeData(prevData => ({
          ...prevData,
          [id]: {
            ...(prevData[id] ?? {}),
            ...data(prevData[id])
          }
        }))
        return
      }

      setNodeData(prevData => ({
        ...prevData,
        [id]: {
          ...(prevData[id] ?? {}),
          ...data
        }
      }))
    },
    []
  )

  return {
    nodes,
    edges,
    nodeData,
    ready,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
    getNodeData,
    updateNodeData,
    setNodes,
    setEdges,
    setNodeData,
    setReady
  }
}
