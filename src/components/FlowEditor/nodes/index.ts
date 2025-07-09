import type { INodeConfig } from '../typescript/node'
import collection from './CollectionNode/config'
import collectionPickFields from './CollectionPickFieldsNode/config'
import controller from './ControllerNode/config'
import databaseCRUDAction from './DatabaseCRUDAction/config'
import filter from './FilterNode/config'
import getFullList from './GetFullListNode/config'
import requestSchema from './RequestSchemaNode/config'
import route from './RouteNode/config'
import router from './RouterNode/config'
import schemaArray from './SchemaArrayNode/config'
import schema from './SchemaNode/config'
import schemaPickFields from './SchemaPickFieldsNode/config'
import service from './ServiceNode/config'
import sorter from './SorterNode/config'
import valueFromRequest from './ValueFromRequestNode/config'
import value from './ValueNode/config'
import schemaWithPB from './WithPBNode/config'

export type NODE_TYPES =
  | 'collection'
  | 'filter'
  | 'sorter'
  | 'collectionPickFields'
  | 'getFullList'
  | 'value'
  | 'valueFromRequest'
  | 'schema'
  | 'schemaWithPB'
  | 'requestSchema'
  | 'schemaArray'
  | 'schemaPickFields'
  | 'router'
  | 'route'
  | 'controller'
  | 'service'
  | 'databaseCRUDAction'

const NODE_CONFIG = {
  collection,
  filter,
  sorter,
  collectionPickFields,
  getFullList,
  value,
  valueFromRequest,
  schema,
  schemaWithPB,
  requestSchema,
  schemaArray,
  schemaPickFields,
  router,
  route,
  controller,
  service,
  databaseCRUDAction
} as const satisfies Record<NODE_TYPES, INodeConfig<any, any>>

const NODES_CATEGORIES: {
  name: string
  nodes: NODE_TYPES[]
}[] = [
  {
    name: 'Database',
    nodes: [
      'collection',
      'filter',
      'sorter',
      'collectionPickFields',
      'getFullList'
    ]
  },
  {
    name: 'Variables',
    nodes: ['value', 'valueFromRequest']
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
    nodes: ['controller', 'service', 'databaseCRUDAction']
  }
]

export default NODE_CONFIG
export { NODES_CATEGORIES }
