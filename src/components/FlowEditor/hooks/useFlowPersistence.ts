import { type Node } from '@xyflow/react'
import { useEffect } from 'react'

import { useFlowStateContext } from './useFlowStateContext'

const STORAGE_KEY = 'flowData'

export function useFlowPersistence() {
  const { setNodes, setEdges, setNodeData, setReady } = useFlowStateContext()

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const flowData = JSON.parse(savedData)
        if (flowData.nodes && flowData.edges) {
          setNodes(
            flowData.nodes.map((node: Node) => ({
              ...node
            }))
          )
          setNodeData(flowData.nodeData || {})
          setEdges(flowData.edges)
          setReady(true)
        }
      } catch (error) {
        console.error('Failed to parse saved flow data:', error)
      }
    }
  }, [setNodes, setEdges, setNodeData, setReady])
}
