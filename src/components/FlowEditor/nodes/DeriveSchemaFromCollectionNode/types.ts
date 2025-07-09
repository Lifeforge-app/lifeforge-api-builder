import type { ISchemaField } from '../SchemaNode/types'

export interface IDeriveSchemaFromCollectionNodeData {
  collectionName: string
  fields: ISchemaField[]
}
