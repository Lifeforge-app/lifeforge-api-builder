export interface IValueFromRequestNodeData {
  requestType: 'query' | 'body' | 'params' | undefined
  field: string
}
