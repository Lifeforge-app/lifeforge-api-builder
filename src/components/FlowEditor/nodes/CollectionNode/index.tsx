import { Icon } from '@iconify/react/dist/iconify.js'

import { Button, useModalStore } from '@lifeforge/ui'

import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import {
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import CollectionSelector from './components/CollectionSelector'
import type { ICollectionNodeData } from './types'

function CollectionNode({ id }: { id: string }) {
  const { name, type, fields } = useNodeData<ICollectionNodeData>(id)
  const updateNode = useUpdateNodeData()
  const open = useModalStore(s => s.open)

  return (
    <NodeColumnWrapper>
      <NodeColumn label="Collection">
        {!name ? (
          <Button
            onClick={() => {
              open(CollectionSelector, {
                onSelect: (selectedCollection: {
                  name: string
                  type: 'base' | 'view'
                  fields: { name: string; type: string }[]
                }) => {
                  updateNode(id, selectedCollection)
                }
              })
            }}
            icon="tabler:folder"
            className="w-full p-2!"
            variant="secondary"
          >
            Select
          </Button>
        ) : (
          <div className="border-bg-200 dark:border-bg-800 component-bg-lighter flex h-10 w-full items-center gap-2 rounded-md border px-3">
            <Icon
              icon={type === 'base' ? 'tabler:folder' : 'tabler:columns-3'}
              className="text-bg-500 size-5"
            />
            <span className="truncate">{name}</span>
          </div>
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
      <NodeColumn nodeType="collection" handle="collection-output" />
    </NodeColumnWrapper>
  )
}

export default CollectionNode
