import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import SorterNode from './index'

export default defineNodeConfig()({
  name: 'Sorter',
  icon: 'tabler:sort-ascending',
  component: SorterNode,
  color: colors.purple[500],
  handlers: {}
} as const)
