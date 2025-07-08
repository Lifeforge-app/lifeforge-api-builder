import { ListboxOption } from '@headlessui/react'
import React from 'react'

function NodeListboxOption({
  value,
  children
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <ListboxOption
      value={value}
      className="text-bg-500 hover:bg-bg-100 focus:bg-bg-100 dark:hover:bg-bg-700/50 dark:focus:bg-bg-700/50 flex items-center gap-3 rounded p-2 text-base transition-colors focus:outline-none"
    >
      {children}
    </ListboxOption>
  )
}

export default NodeListboxOption
