import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import ValueFromRequestNode from './index'

export default defineNodeConfig()({
  name: 'Value From Request',
  icon: 'tabler:arrow-down',
  component: ValueFromRequestNode,
  color: colors.yellow[500],
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
