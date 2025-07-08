export interface ICollectionNodeData {
  name: string
  type: 'base' | 'view'
  fields: {
    name: string
    type: string
  }[]
}
