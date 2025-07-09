import { Listbox, ListboxButton, ListboxOptions } from '@headlessui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type NodeListboxProps =
  | {
      multiple: true
      value: string[]
      setValue: (value: string[]) => void
      buttonContent?: React.ReactNode
      children?: React.ReactNode
    }
  | {
      multiple?: false
      value: string
      setValue: (value: string) => void
      buttonContent?: React.ReactNode
      children?: React.ReactNode
    }

function NodeListbox({
  value,
  setValue,
  buttonContent,
  children,
  multiple
}: NodeListboxProps) {
  const { t } = useTranslation('core.apiBuilder')

  return (
    <Listbox multiple={multiple} value={value} onChange={setValue}>
      <ListboxButton className="border-bg-200 dark:border-bg-800 component-bg-lighter flex-between h-10 w-full gap-3 rounded-md border pr-2 pl-3">
        <div className="text-bg-600 dark:text-bg-400 w-full min-w-0 truncate text-left">
          {value.length === 0 ? (
            <span className="text-bg-400 dark:text-bg-600">
              {t('empty.pleaseSelect')}
            </span>
          ) : (
            buttonContent || <span>{multiple ? value.join(', ') : value}</span>
          )}
        </div>
        <Icon
          icon="tabler:chevron-down"
          className="text-bg-400 dark:text-bg-600"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          'border-bg-200 dark:border-bg-700 bg-bg-100 dark:bg-bg-800 shadow-custom min-w-[max(var(--button-width),16rem)] rounded-lg border p-1 [--anchor-gap:--spacing(2)] focus:outline-none',
          'transition duration-100 ease-in data-leave:data-closed:opacity-0'
        )}
      >
        {children}
      </ListboxOptions>
    </Listbox>
  )
}

export default NodeListbox
