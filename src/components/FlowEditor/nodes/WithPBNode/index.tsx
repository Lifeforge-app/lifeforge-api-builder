import { useNodeConnections } from '@xyflow/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeTextInput from '../../components/Node/NodeTextInput'
import {
  useGetNodeData,
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import FieldsColumn from '../SchemaNode/components/FieldsColumn'
import type { ISchemaField, ISchemaNodeData } from '../SchemaNode/types'

const PB_SCHEMA: ISchemaField[] = [
  { name: 'id', type: 'string', isOptional: false },
  { name: 'collectionId', type: 'string', isOptional: false },
  { name: 'collectionName', type: 'string', isOptional: false }
]

function WithPBNode({ id }: { id: string }) {
  const updateNode = useUpdateNodeData()
  const { name, fields } = useNodeData<ISchemaNodeData>(id)
  const getNodeData = useGetNodeData()
  const { t } = useTranslation('core.apiBuilder')
  const connections = useNodeConnections()
  const inputConnections = useMemo(
    () =>
      connections.filter(
        conn => conn.targetHandle === 'schema-input' && conn.target === id
      ),
    [connections, id]
  )
  const inputSchemaData = useMemo(() => {
    if (inputConnections.length === 0) return null
    const inputSchemaNodeId = inputConnections[0].source
    return getNodeData<ISchemaNodeData>(inputSchemaNodeId)
  }, [inputConnections, getNodeData])

  useEffect(() => {
    if (!inputSchemaData) {
      updateNode(id, { fields: [], name: '' })
    } else {
      updateNode(id, {
        name: `${inputSchemaData.name || 'Schema'}WithPB`,
        fields: [...inputSchemaData.fields, ...PB_SCHEMA]
      })
    }
  }, [inputSchemaData, id, updateNode])

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="schemaWithPB" handle="schema-input">
        {inputSchemaData && <NodeTextInput value={name} disabled />}
      </NodeColumn>
      {inputSchemaData ? (
        <FieldsColumn fields={fields} />
      ) : (
        <p className="text-bg-500 text-center">
          {t('empty.noSchemaConnected')}
        </p>
      )}
      <NodeColumn nodeType="schemaWithPB" handle="schema-output" />
    </NodeColumnWrapper>
  )
}

export default WithPBNode
