import { Icon } from '@iconify/react/dist/iconify.js'
import { useTranslation } from 'react-i18next'
import { Fragment } from 'react/jsx-runtime'

import NodeColumn from '../../../components/Node/NodeColumn'
import NodeColumnValueWrapper from '../../../components/Node/NodeColumnValueWrapper'
import FIELD_TYPES from '../constants/field_types'
import type { ISchemaField } from '../types'

function FieldsColumn({
  fields,
  withLabel = true,
  withEmptyMessage = true
}: {
  fields: ISchemaField[]
  withLabel?: boolean
  withEmptyMessage?: boolean
}) {
  const { t } = useTranslation('core.apiBuilder')
  const FinalComponent = withLabel ? NodeColumn : Fragment

  return (
    <FinalComponent label="Fields">
      <div className="space-y-1.5">
        {fields.length
          ? fields.map((f, i) => (
              <NodeColumnValueWrapper key={i}>
                <div className="flex-between w-full gap-3">
                  <span className="flex items-center gap-2">
                    <Icon
                      icon={
                        FIELD_TYPES.find(t => t.label.toLowerCase() === f.type)
                          ?.icon || 'tabler:abc'
                      }
                      className="text-bg-500 size-4"
                    />
                    {f.name}
                  </span>
                  <span className="text-bg-400">
                    {f.type}
                    {f.isOptional ? '?' : ''}
                  </span>
                </div>
              </NodeColumnValueWrapper>
            ))
          : withEmptyMessage && (
              <p className="text-bg-500 text-center text-sm">
                {t('empty.noFields')}
              </p>
            )}
      </div>
    </FinalComponent>
  )
}

export default FieldsColumn
