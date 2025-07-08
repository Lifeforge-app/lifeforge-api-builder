import { useReactFlow } from '@xyflow/react'
import { toast } from 'react-toastify'

import { Button } from '@lifeforge/ui'

interface SaveButtonProps {
  nodeData: Record<string, unknown>
}

export function SaveButton({ nodeData }: SaveButtonProps) {
  const { toObject } = useReactFlow()

  const handleSave = () => {
    const json = toObject()
    const flowData = { ...json, nodeData }
    localStorage.setItem('flowData', JSON.stringify(flowData))
    toast.success('Flow saved successfully!')
  }

  return (
    <Button
      icon="uil:save"
      className="absolute top-4 right-4 z-10"
      onClick={handleSave}
    >
      Save Flow
    </Button>
  )
}
