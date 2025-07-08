import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'

function DatabaseCRUDAction() {
  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="databaseCRUDAction" handle="db-operation-input" />
      <NodeColumn nodeType="databaseCRUDAction" handle="action-output" />
    </NodeColumnWrapper>
  )
}

export default DatabaseCRUDAction
