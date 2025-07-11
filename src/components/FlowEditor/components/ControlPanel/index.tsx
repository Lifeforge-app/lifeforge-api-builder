import { Panel } from '@xyflow/react'

import DownloadButton from './components/DownloadButton'
import { SaveButton } from './components/SaveButton'

function ControlPanel() {
  return (
    <Panel position="top-right" className="flex items-center gap-2">
      <DownloadButton />
      <SaveButton />
    </Panel>
  )
}

export default ControlPanel
