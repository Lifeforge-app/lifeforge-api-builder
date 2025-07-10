import { useMemo } from 'react'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeTextInput from '../../components/Node/NodeTextInput'
import { useFlowStateContext } from '../../hooks/useFlowStateContext'
import type { IRouterNodeData } from './types'

function RouterNode({ id }: { id: string }) {
  const { getNodeData, updateNodeData } = useFlowStateContext()
  const { path } = useMemo(
    () => getNodeData<IRouterNodeData>(id),
    [getNodeData, id]
  )

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="router" handle="router-input" />
      <NodeColumn label="Router Path">
        <NodeTextInput
          value={path}
          setValue={(newValue: string) => {
            updateNodeData(id, { path: newValue })
          }}
          placeholder="/route/path"
        />
      </NodeColumn>
      <NodeColumn nodeType="router" handle="router-output" />
    </NodeColumnWrapper>
  )
}

export default RouterNode
