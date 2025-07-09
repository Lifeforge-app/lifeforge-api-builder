import type { Edge } from '@xyflow/react'
import { createContext, useContext } from 'react'

export const NodeDataContext = createContext<{
  getNodeData: <T extends Record<string, any>>(id: string) => T
  updateNodeData: <T extends Record<string, any>>(
    id: string,
    data: T | ((prevData: T) => T)
  ) => void
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}>({
  getNodeData: <T extends Record<string, any>>() => ({}) as T,
  updateNodeData: () => {},
  setEdges: () => {}
})

export function useGetNodeData() {
  const context = useContext(NodeDataContext)
  if (!context) {
    throw new Error('useGetNodeData must be used within NodeDataContext')
  }
  return context.getNodeData
}

export function useUpdateNodeData() {
  const context = useContext(NodeDataContext)
  if (!context) {
    throw new Error('useUpdateNode must be used within UpdateNodeContext')
  }
  return context.updateNodeData
}

export function useNodeData<T extends Record<string, any>>(id: string): T {
  const context = useContext(NodeDataContext)
  if (!context) {
    throw new Error('useGetNodeData must be used within NodeDataContext')
  }
  return context.getNodeData<T>(id)
}

export function useSetEdges() {
  const context = useContext(NodeDataContext)
  if (!context) {
    throw new Error('useSetEdges must be used within NodeDataContext')
  }
  return context.setEdges
}
