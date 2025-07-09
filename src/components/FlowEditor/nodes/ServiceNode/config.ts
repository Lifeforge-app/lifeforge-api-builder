import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import ServiceNode from './index'

export default defineNodeConfig()({
  name: 'Service',
  icon: 'tabler:cpu',
  component: ServiceNode,
  color: colors.green[500],
  handlers: {
    'controller-input': {
      label: 'Controller',
      nodeType: 'controller',
      cardinality: 1,
      filter: {
        handler: ['controller-output']
      }
    }
  }
} as const)
