import { Icon } from '@iconify/react/dist/iconify.js'
import { useNodeConnections } from '@xyflow/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeListbox from '../../components/Node/NodeListbox'
import NodeListboxOption from '../../components/Node/NodeListboxOption'
import { useFlowStateContext } from '../../hooks/useFlowStateContext'
import FieldsColumn from '../SchemaNode/components/FieldsColumn'
import FIELD_TYPES from '../SchemaNode/constants/field_types'
import type { ISchemaNodeData } from '../SchemaNode/types'
import type { IPickFieldsFromSchemaNodeData } from './types'

function SchemaPickFieldsNode({ id }: { id: string }) {
  const { t } = useTranslation('core.apiBuilder')
  const { getNodeData, updateNodeData } = useFlowStateContext()
  const { fieldIds, fields } = useMemo(
    () => getNodeData<IPickFieldsFromSchemaNodeData>(id),
    [getNodeData, id]
  )
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
      updateNodeData(id, { fieldIds: [], fields: [] })
      return
    }

    updateNodeData<IPickFieldsFromSchemaNodeData>(id, prevData => {
      const newFieldIds = prevData.fieldIds.filter(fieldId =>
        inputSchemaData.fields.some(field => field.name === fieldId)
      )
      return {
        ...prevData,
        fieldIds: newFieldIds,
        fields: inputSchemaData.fields.filter(field =>
          newFieldIds.includes(field.name)
        )
      }
    })
  }, [inputSchemaData, id, updateNodeData])

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="schemaPickFields" handle="schema-input" />
      <NodeColumn label="Field IDs">
        {inputSchemaData ? (
          inputSchemaData.fields.length > 0 ? (
            <NodeListbox
              multiple
              value={fieldIds}
              setValue={(value: string[]) =>
                updateNodeData(id, {
                  fieldIds: value,
                  fields: inputSchemaData.fields.filter(field =>
                    value.includes(field.name)
                  )
                })
              }
            >
              {inputSchemaData.fields.map(field => (
                <NodeListboxOption
                  key={field.name}
                  value={field.name}
                  isSelected={fieldIds.includes(field.name)}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={
                        FIELD_TYPES.find(
                          t => t.label.toLowerCase() === field.type
                        )?.icon || 'tabler:abc'
                      }
                      className="text-bg-500 size-4"
                    />
                    {field.name}
                  </div>
                </NodeListboxOption>
              ))}
            </NodeListbox>
          ) : (
            <p className="text-bg-500 text-center">
              {t('empty.noFieldsInSchema')}
            </p>
          )
        ) : (
          <p className="text-bg-500 text-center">
            {t('empty.noSchemaConnected')}
          </p>
        )}
      </NodeColumn>
      <FieldsColumn fields={fields} />
      <NodeColumn nodeType="schemaPickFields" handle="schema-output" />
    </NodeColumnWrapper>
  )
}

export default SchemaPickFieldsNode
