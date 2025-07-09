import { useModalStore } from '@lifeforge/ui'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeConfigButton from '../../components/Node/NodeConfigButton'
import NodeTextInput from '../../components/Node/NodeTextInput'
import {
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import EditSchemaNodeModal from './components/EditSchemaBlockModal'
import FieldsColumn from './components/FieldsColumn'
import type { ISchemaNodeData } from './types'

function SchemaNode({ id }: { id: string }) {
  const data = useNodeData<ISchemaNodeData>(id)
  const open = useModalStore(s => s.open)
  const updateNode = useUpdateNodeData()

  return (
    <NodeColumnWrapper>
      <NodeConfigButton
        onClick={() => {
          open(EditSchemaNodeModal, {
            schema: data,
            onSave: updated => updateNode(id, updated)
          })
        }}
      />
      <NodeColumn label="Schema Name">
        <NodeTextInput
          value={data.name}
          setValue={newValue => {
            updateNode(id, { name: newValue })
          }}
        />
      </NodeColumn>
      <FieldsColumn fields={data.fields} />
      <NodeColumn nodeType="schema" handle="schema-output" />
    </NodeColumnWrapper>
  )
}

export default SchemaNode
