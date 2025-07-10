import { Icon } from '@iconify/react/dist/iconify.js'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'

import { Button, useModalStore } from '@lifeforge/ui'

import { useFlowStateContext } from '../../../hooks/useFlowStateContext'
import GroupNodeConfigModal from './components/GroupNodeConfigModal'

function GroupNode({ selected, id }: { selected: boolean; id: string }) {
  const open = useModalStore(s => s.open)
  const { getNodeData } = useFlowStateContext()
  const { name, icon } = useMemo(
    () => getNodeData<{ name: string; icon: string }>(id),
    [getNodeData, id]
  )

  const handleOpenConfig = useCallback(() => {
    open(GroupNodeConfigModal, {
      nodeId: id
    })
  }, [open, id])

  return (
    <div
      className={clsx(
        'relative h-full overflow-hidden rounded-3xl border-2 transition-colors',
        !selected ? 'border-bg-500' : 'border-bg-900 dark:border-bg-100'
      )}
    >
      <div className="text-bg-500 flex-between absolute top-0 left-0 w-full gap-4 p-4">
        <div className="flex items-center gap-3">
          <Icon icon={icon ?? 'tabler:box'} className="size-8" />
          <span className="text-3xl font-medium">
            {name ?? 'Untitled Group'}
          </span>
        </div>
        <Button
          onClick={handleOpenConfig}
          icon="tabler:settings"
          variant="plain"
          iconClassName="size-8"
        />
      </div>
    </div>
  )
}

export default GroupNode
