import colors from 'tailwindcss/colors'

import defineNodeConfig from '../../utils/defineConfig'
import RequestSchemaNode from './index'

export default defineNodeConfig()({
  name: 'Request Schema',
  icon: 'tabler:forms',
  component: RequestSchemaNode,
  color: colors.indigo[500],
  handlers: {
    'params-schema-input': {
      label: 'Params Schema',
      nodeType: 'schema',
      cardinality: 1,
      filter: {
        handler: ['schema-output']
      }
    },
    'query-schema-input': {
      label: 'Query Schema',
      nodeType: 'schema',
      cardinality: 1,
      filter: {
        handler: ['schema-output']
      },
      optional: true
    },
    'body-schema-input': {
      label: 'Body Schema',
      nodeType: 'schema',
      cardinality: 1,
      filter: {
        handler: ['schema-output']
      },
      optional: true
    },
    'request-schema-output': {
      label: 'Request Schema',
      nodeType: 'requestSchema',
      cardinality: 1,
      filter: {
        handler: ['request-schema-input']
      },
      optional: true
    }
  }
} as const)
