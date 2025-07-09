import { useEdges, useNodes } from '@xyflow/react'
import { useMemo } from 'react'
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
import { traverseGraph } from '../../utils/traverseGraph'
import type { ICollectionNodeData } from '../CollectionNode/types'
import type { ICollectionPickFieldsNodeData } from './types'

function CollectionPickFieldsNode({ id }: { id: string }) {
  const { t } = useTranslation('core.apiBuilder')
  const getNodeData = useGetNodeData()
  const { fieldIds, fields } = useNodeData<ICollectionPickFieldsNodeData>(id)
  const updateNodeData = useUpdateNodeData()
  const allNodes = useNodes()
  const allEdges = useEdges()

  const targetCollection = useMemo(() => {
    return traverseGraph(allNodes, allEdges, id, [
      { dir: 'out', id: 'collection-pick-fields-output' },
      { dir: 'in', id: 'collection-input' }
    ])
  }, [allNodes, allEdges, id])

  const selectableColumns = useMemo(() => {
    if (!targetCollection) return []

    const collectionNodeData = getNodeData<ICollectionNodeData>(
      targetCollection.id
    )
    return collectionNodeData.fields ?? []
  }, [targetCollection, getNodeData])

  return (
    <NodeColumnWrapper>
      <NodeColumn label="Field IDs">
        {targetCollection ? (
          selectableColumns.length > 0 ? (
            <NodeListbox
              multiple
              value={fieldIds}
              setValue={(value: string[]) =>
                updateNodeData(id, {
                  fieldIds: value,
                  fields: selectableColumns.filter(f => value.includes(f.name))
                })
              }
            >
              {selectableColumns.map(f => (
                <NodeListboxOption
                  key={f.name}
                  value={f.name}
                  isSelected={fields.includes(f)}
                >
                  <div className="flex-between w-full gap-3">
                    {f.name}
                    <span className="text-bg-500">{f.type}</span>
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
      {fields.length > 0 && (
        <NodeColumn label="Fields">
          <div className="flex flex-col gap-1">
            {fields.map((field, index) => (
              <div
                key={index}
                className="border-bg-200 dark:border-bg-800 component-bg-lighter flex items-center justify-between gap-3 rounded border p-2"
              >
                <span className="text-bg-600 dark:text-bg-400 truncate">
                  {field.name}
                </span>
                <span className="text-bg-500">{field.type}</span>
              </div>
            ))}
          </div>
        </NodeColumn>
      )}
      <NodeColumn
        nodeType="collectionPickFields"
        handle="collection-pick-fields-output"
      />
    </NodeColumnWrapper>
  )
}

export default CollectionPickFieldsNode
