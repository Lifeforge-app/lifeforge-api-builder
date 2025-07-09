import type { INodeConfig } from '../typescript/node'
import collection from './CollectionNode/config'
import collectionPickFields from './CollectionPickFieldsNode/config'
import controller from './ControllerNode/config'
import createRecord from './CreateRecordNode/config'
import requestSchema from './RequestSchemaNode/config'
import route from './RouteNode/config'
import router from './RouterNode/config'
import schemaArray from './SchemaArrayNode/config'
import schema from './SchemaNode/config'
import schemaPickFields from './SchemaPickFieldsNode/config'
import service from './ServiceNode/config'
import schemaWithPB from './WithPBNode/config'

export type NODE_TYPES =
  | 'collection'
  | 'collectionPickFields'
  | 'createRecord'
  | 'schema'
  | 'schemaWithPB'
  | 'requestSchema'
  | 'schemaArray'
  | 'schemaPickFields'
  | 'router'
  | 'route'
  | 'controller'
  | 'service'

const NODE_CONFIG = {
  collection,
  collectionPickFields,
  createRecord,
  schema,
  schemaWithPB,
  requestSchema,
  schemaArray,
  schemaPickFields,
  router,
  route,
  controller,
  service
} as const satisfies Record<NODE_TYPES, INodeConfig<any, any>>

const NODES_CATEGORIES: {
  name: string
  nodes: NODE_TYPES[]
}[] = [
  {
    name: 'Database',
    nodes: ['collection', 'collectionPickFields', 'createRecord']
  },
  {
    name: 'Schema',
    nodes: [
      'schema',
      'schemaWithPB',
      'schemaArray',
      'schemaPickFields',
      'requestSchema'
    ]
  },
  {
    name: 'Routing',
    nodes: ['router', 'route']
  },
  {
    name: 'Action',
    nodes: ['controller', 'service']
  }
]

export default NODE_CONFIG
export { NODES_CATEGORIES }
