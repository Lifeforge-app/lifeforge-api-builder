import { useEdges, useNodes } from '@xyflow/react'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnValueWrapper from '../../components/Node/NodeColumnValueWrapper'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeListbox from '../../components/Node/NodeListbox'
import NodeListboxOption from '../../components/Node/NodeListboxOption'
import {
  useGetNodeData,
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import { traverseGraph } from '../../utils/traverseGraph'
import type { ICollectionNodeData } from '../CollectionNode/types'
import type { IValueFromRequestNodeData } from '../ValueFromRequestNode/types'
import type { IFilterNodeData } from './types'

const OPERATIONS = [
  { value: '=', label: 'Equals' },
  { value: '!=', label: 'Not Equals' },
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: '>=', label: 'Greater Than or Equal To' },
  { value: '<=', label: 'Less Than or Equal To' },
  { value: '~', label: 'Contains' },
  { value: '!~', label: 'Does Not Contain' }
]

function FilterNode({ id }: { id: string }) {
  const { t } = useTranslation('core.apiBuilder')
  const getNodeData = useGetNodeData()
  const { columnName, comparator } = useNodeData<IFilterNodeData>(id)
  const updateNode = useUpdateNodeData()
  const allNodes = useNodes()
  const allEdges = useEdges()

  const targetCollection = useMemo(() => {
    return traverseGraph(allNodes, allEdges, id, [
      { dir: 'out', id: 'filter-output' },
      { dir: 'in', id: 'collection-input' }
    ])
  }, [allNodes, allEdges, id])

  const targetValueNode = useMemo(() => {
    return traverseGraph(allNodes, allEdges, id, [
      { dir: 'in', id: 'value-input' }
    ])
  }, [allNodes, allEdges, id])

  const selectableColumns = useMemo(() => {
    if (!targetCollection) return []

    const collectionNodeData = getNodeData<ICollectionNodeData>(
      targetCollection.id
    )
    return collectionNodeData.fields ?? []
  }, [targetCollection, getNodeData])

  const targetValueNodeData = useMemo(() => {
    if (!targetValueNode) return null

    if (targetValueNode.type === 'valueFromRequest') {
      const data = getNodeData<IValueFromRequestNodeData>(targetValueNode.id)
      return {
        type: 'valueFromRequest',
        requestType: data.requestType,
        field: data.field
      }
    }

    if (targetValueNode.type === 'value') {
      //TODO
    }

    return null
  }, [targetValueNode, getNodeData])

  useEffect(() => {
    if (!targetCollection) {
      updateNode(id, { columnName: '', comparator: '' })
      return
    }
  }, [targetCollection, id, updateNode])

  return (
    <NodeColumnWrapper>
      {targetCollection ? (
        <>
          <NodeColumn label="Field">
            <NodeListbox
              value={columnName}
              setValue={value => updateNode(id, { columnName: value })}
            >
              {selectableColumns.map(field => (
                <NodeListboxOption
                  key={field.name}
                  value={field.name}
                  isSelected={field.name === columnName}
                >
                  {field.name}
                </NodeListboxOption>
              ))}
            </NodeListbox>
          </NodeColumn>
          <NodeColumn label="Comparator">
            <NodeListbox
              value={comparator}
              setValue={value => updateNode(id, { comparator: value })}
              buttonContent={
                <>
                  {OPERATIONS.find(op => op.value === comparator)?.label} (
                  {comparator})
                </>
              }
            >
              {OPERATIONS.map(op => (
                <NodeListboxOption
                  key={op.value}
                  value={op.value}
                  isSelected={op.value === comparator}
                >
                  <span className="whitespace-nowrap">
                    {op.label} ({op.value})
                  </span>
                </NodeListboxOption>
              ))}
            </NodeListbox>
          </NodeColumn>
        </>
      ) : (
        <p className="text-bg-500 text-center text-sm">
          {t('empty.noCollectionConnected')}
        </p>
      )}
      <NodeColumn nodeType="filter" handle="value-input">
        {targetValueNodeData ? (
          <NodeColumnValueWrapper>
            {targetValueNodeData.type === 'valueFromRequest' && (
              <span className="flex-between w-full gap-3">
                <span className="truncate">
                  {targetValueNodeData.field || 'No Field Selected'}
                </span>
                <span className="text-bg-500 text-sm">
                  {targetValueNodeData.requestType
                    ? `(${targetValueNodeData.requestType})`
                    : ''}
                </span>
              </span>
            )}
          </NodeColumnValueWrapper>
        ) : (
          <p className="text-bg-500 text-center">
            {t('empty.noValueConnected')}
          </p>
        )}
      </NodeColumn>
      <NodeColumn nodeType="filter" handle="filter-output" />
    </NodeColumnWrapper>
  )
}

export default FilterNode
