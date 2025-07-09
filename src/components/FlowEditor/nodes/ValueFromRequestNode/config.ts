import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import ValueFromRequestNode from './index'
import { type IValueFromRequestNodeData } from './types'

export default defineNodeConfig<IValueFromRequestNodeData>()({
  name: 'Value From Request',
  icon: 'tabler:arrow-down',
  component: ValueFromRequestNode,
  color: colors.yellow[500],
  data: {
    requestType: undefined,
    field: ''
  },
  handlers: {
    'value-output': {
      label: 'Value',
      nodeType: 'value',
      cardinality: 'many',
      filter: {
        handler: ['value-input']
      }
    }
  }
} as const)
