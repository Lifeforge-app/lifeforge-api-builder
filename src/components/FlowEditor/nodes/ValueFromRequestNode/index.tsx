import { useEdges, useNodes } from '@xyflow/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeListbox from '../../components/Node/NodeListbox'
import NodeListboxOption from '../../components/Node/NodeListboxOption'
import {
  useGetNodeData,
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import { findNodeTypeInGraph } from '../../utils/findNodeTypeInGraph'
import { traverseGraph } from '../../utils/traverseGraph'
import type { ISchemaField } from '../SchemaNode/types'
import type { IPickFieldsFromSchemaNodeData } from '../SchemaPickFieldsNode/types'
import type { IValueFromRequestNodeData } from './types'

function ValueFromRequest({ id }: { id: string }) {
  const { t } = useTranslation('core.apiBuilder')
  const nodes = useNodes()
  const edges = useEdges()
  const { requestType, field } = useNodeData<IValueFromRequestNodeData>(id)
  const updateNodeData = useUpdateNodeData()
  const getNodeData = useGetNodeData()

  const requestSchemaNode = findNodeTypeInGraph(
    nodes,
    edges,
    id,
    'requestSchema'
  )

  const fieldOptions = useMemo(() => {
    if (!requestSchemaNode) return []

    const selectableColumns: {
      from: 'params' | 'query' | 'body'
      field: ISchemaField
    }[] = []

    for (const type of ['params', 'query', 'body'] as const) {
      const schemaNode = traverseGraph(nodes, edges, requestSchemaNode.id, [
        { dir: 'in', id: `${type}-schema-input` }
      ])
      if (schemaNode) {
        const schemaData = getNodeData<IPickFieldsFromSchemaNodeData>(
          schemaNode.id
        )
        selectableColumns.push(
          ...schemaData.fields.map(field => ({
            from: type,
            field
          }))
        )
      }
    }

    return selectableColumns
  }, [nodes, edges, requestSchemaNode, getNodeData])

  useEffect(() => {
    if (!requestSchemaNode) {
      updateNodeData(id, { requestType: undefined, field: '' })
      return
    }
  }, [requestSchemaNode, id, updateNodeData])

  useEffect(() => {
    if (field && !fieldOptions.some(option => option.field.name === field)) {
      updateNodeData(id, { requestType: undefined, field: '' })
    }
  }, [field, fieldOptions, id, updateNodeData])

  return (
    <NodeColumnWrapper>
      {requestSchemaNode ? (
        <NodeColumn label="Field">
          <NodeListbox
            value={field ? `${requestType}||${field}` : ''}
            setValue={value => {
              const [type, selectedField] = value.split('||')
              updateNodeData(id, {
                requestType: type as 'params' | 'query' | 'body',
                field: selectedField || ''
              })
            }}
            buttonContent={
              field && (
                <span className="flex-between w-full gap-3">
                  <span className="truncate">
                    {fieldOptions.find(option => option.field.name === field)
                      ?.field.name || field}
                  </span>
                  <span className="text-bg-500 text-sm">
                    {requestType ? ` (${requestType})` : ''}
                  </span>
                </span>
              )
            }
          >
            {fieldOptions.map(option => (
              <NodeListboxOption
                key={`${option.from}||${option.field.name}`}
                value={`${option.from}||${option.field.name}`}
                isSelected={
                  field === option.field.name && requestType === option.from
                }
              >
                <span className="flex-between w-full gap-3">
                  <span className="truncate">{option.field.name}</span>
                  <span className="text-bg-500 text-sm">({option.from})</span>
                </span>
              </NodeListboxOption>
            ))}
          </NodeListbox>
        </NodeColumn>
      ) : (
        <div className="text-bg-500 p-2 text-center">
          {t('empty.noRequestSchemaConnected')}
        </div>
      )}
      <NodeColumn nodeType="valueFromRequest" handle="value-output" />
    </NodeColumnWrapper>
  )
}

export default ValueFromRequest
