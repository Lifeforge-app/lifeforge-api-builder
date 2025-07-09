import colors from 'tailwindcss/colors'

import DeriveSchemaFromCollectionNode from '.'
import defineNodeConfig from '../../utils/defineConfig'

export default defineNodeConfig()({
  name: 'Derive Schema From Collection',
  icon: 'tabler:database-export',
  component: DeriveSchemaFromCollectionNode,
  color: colors.blue[500],
  data: {
    collectionName: '',
    fields: []
  },
  handlers: {
    'collection-input': {
      label: 'Collection',
      nodeType: 'collection',
      cardinality: 1,
      filter: {
        handler: ['collection-output']
      }
    },
    'schema-output': {
      label: 'Schema',
      nodeType: 'schema',
      cardinality: 1,
      filter: {
        handler: ['schema-input']
      }
    }
  }
} as const)
