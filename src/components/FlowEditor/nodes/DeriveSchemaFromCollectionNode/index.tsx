import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'

function DeriveSchemaFromCollectionNode() {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        nodeType="deriveSchemaFromCollection"
        handle="collection-input"
      />
      <NodeColumn label="Fields"></NodeColumn>
      <NodeColumn
        nodeType="deriveSchemaFromCollection"
        handle="schema-output"
      />
    </NodeColumnWrapper>
  )
}

export default DeriveSchemaFromCollectionNode
