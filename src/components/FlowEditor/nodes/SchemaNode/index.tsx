import { useMemo } from 'react'

import { useModalStore } from '@lifeforge/ui'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeConfigButton from '../../components/Node/NodeConfigButton'
import NodeTextInput from '../../components/Node/NodeTextInput'
import { useFlowStateContext } from '../../hooks/useFlowStateContext'
import EditSchemaNodeModal from './components/EditSchemaBlockModal'
import FieldsColumn from './components/FieldsColumn'
import type { ISchemaNodeData } from './types'

function SchemaNode({ id }: { id: string }) {
  const { getNodeData, updateNodeData } = useFlowStateContext()
  const data = useMemo(
    () => getNodeData<ISchemaNodeData>(id),
    [getNodeData, id]
  )
  const open = useModalStore(s => s.open)

  return (
    <NodeColumnWrapper>
      <NodeConfigButton
        onClick={() => {
          open(EditSchemaNodeModal, {
            schema: data,
            onSave: updated => updateNodeData(id, updated)
          })
        }}
      />
      <NodeColumn label="Schema Name">
        <NodeTextInput
          value={data.name}
          setValue={newValue => {
            updateNodeData(id, { name: newValue })
          }}
        />
      </NodeColumn>
      <FieldsColumn fields={data.fields} />
      <NodeColumn nodeType="schema" handle="schema-output" />
    </NodeColumnWrapper>
  )
}

export default SchemaNode
