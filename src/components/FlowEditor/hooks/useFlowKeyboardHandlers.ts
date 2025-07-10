import { type Node, useNodes, useReactFlow } from '@xyflow/react'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { useModalStore } from '@lifeforge/ui'

import GroupNodeConfigModal from '../components/Node/GroupNode/components/GroupNodeConfigModal'
import NodeSelector from '../components/Node/NodeSelector'
import { type NODE_TYPES } from '../nodes'
import { useFlowStateContext } from './useFlowStateContext'

const GROUP_MARGIN = 40

export function useFlowKeyboardHandlers() {
  const { onAddNode, setNodes, updateNodeData } = useFlowStateContext()
  const nodes = useNodes()
  const { screenToFlowPosition } = useReactFlow()
  const open = useModalStore(s => s.open)
  const stack = useModalStore(s => s.stack)
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const openNodeSelector = useCallback(() => {
    if (stack.length > 0) {
      return
    }

    const position = screenToFlowPosition({
      x: mousePosition.current.x,
      y: mousePosition.current.y
    })

    open(NodeSelector, {
      onSelect: (nodeType: NODE_TYPES) => {
        onAddNode(nodeType, position)
      }
    })
  }, [screenToFlowPosition, open, onAddNode, stack])

  const groupSelectedNodes = useCallback(() => {
    const selectedNodes = nodes.filter(node => node.selected)

    if (selectedNodes.length === 0) {
      return
    }

    if (selectedNodes.some(node => node.extent)) {
      toast.error(
        'Cannot group nodes that are already part of a group or have an extent.'
      )
      return
    }

    const minX = Math.min(...selectedNodes.map(node => node.position.x))
    const minY = Math.min(...selectedNodes.map(node => node.position.y))
    const maxX = Math.max(
      ...selectedNodes.map(
        node =>
          node.position.x +
          (() => {
            const element = document.querySelector(`[data-id="${node.id}"]`)
            return element ? element.clientWidth : 0
          })()
      )
    )
    const maxY = Math.max(
      ...selectedNodes.map(
        node =>
          node.position.y +
          (() => {
            const element = document.querySelector(`[data-id="${node.id}"]`)
            return element ? element.clientHeight : 0
          })()
      )
    )

    const groupNode: Node = {
      id: `group-${uuidv4()}`,
      type: 'group',
      position: {
        x: Math.round((minX - GROUP_MARGIN) / 20) * 20,
        y: Math.round((minY - GROUP_MARGIN) / 20) * 20 - 60
      },
      data: {},
      width: Math.round((maxX - minX + GROUP_MARGIN * 2) / 20) * 20,
      height: Math.round((maxY - minY + GROUP_MARGIN * 2) / 20) * 20 + 60
    }

    setNodes(nds => [
      ...nds.filter(node => !node.selected),
      groupNode,
      ...selectedNodes.map(node => ({
        ...node,
        selected: false,
        position: {
          x: node.position.x - groupNode.position.x,
          y: node.position.y - groupNode.position.y
        },
        extent: 'parent' as const,
        parentId: groupNode.id
      }))
    ])

    updateNodeData(groupNode.id, {
      name: '',
      icon: ''
    })

    open(GroupNodeConfigModal, {
      nodeId: groupNode.id
    })
  }, [nodes, setNodes, open, updateNodeData])

  const ungroupNodes = useCallback(() => {
    const selectedNodes = nodes.filter(
      node => node.selected && node.type === 'group'
    )

    if (selectedNodes.length === 0) {
      return
    }

    const toBeUngrouped = selectedNodes[0]

    setNodes(nds =>
      nds
        .filter(node => node.id !== toBeUngrouped.id)
        .map(node => {
          if (node.parentId === toBeUngrouped.id) {
            return {
              ...node,
              selected: false,
              position: {
                x: node.position.x + toBeUngrouped.position.x,
                y: node.position.y + toBeUngrouped.position.y
              },
              extent: undefined,
              parentId: undefined
            }
          }
          return node
        })
    )
  }, [nodes, setNodes])

  const isInputFocused = useCallback(() => {
    return (
      document.activeElement &&
      (document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA')
    )
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isInputFocused()) {
        return
      }

      if (event.key.toLowerCase() === 'a') {
        openNodeSelector()
      }

      if (event.key.toLowerCase() === 'g') {
        if (event.shiftKey) {
          ungroupNodes()
          return
        }
        groupSelectedNodes()
      }
    },
    [isInputFocused, openNodeSelector, groupSelectedNodes, ungroupNodes]
  )

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mousePosition.current = { x: event.clientX, y: event.clientY }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleKeyDown, handleMouseMove])
}
