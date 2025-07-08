import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import CollectionPickFieldsNode from './index'

export default defineNodeConfig()({
  name: 'Collection Pick Fields',
  icon: 'tabler:checklist',
  component: CollectionPickFieldsNode,
  color: colors.purple[500],
  handlers: {}
} as const)
