import NodeColumn from '../../components/Node/NodeColumn'
import NodeColumnWrapper from '../../components/Node/NodeColumnWrapper'
import NodeListbox from '../../components/Node/NodeListbox'
import NodeListboxOption from '../../components/Node/NodeListboxOption'
import NodeTextInput from '../../components/Node/NodeTextInput'
import {
  useNodeData,
  useUpdateNodeData
} from '../../providers/NodeDataProviders'
import METHOD_COLORS from './constants/method_colors'
import type { IRouteNodeData } from './types'

function RouteNode({ id }: { id: string }) {
  const { method, path } = useNodeData<IRouteNodeData>(id)
  const updateNode = useUpdateNodeData()

  return (
    <NodeColumnWrapper>
      <NodeColumn nodeType="route" handle="router-input" />
      <NodeColumn label="HTTP Method">
        <NodeListbox
          value={method}
          setValue={value => updateNode(id, { method: value as typeof method })}
          buttonContent={
            <span className="text-bg-500 flex items-center gap-2 font-medium">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: METHOD_COLORS[method]?.[500] || '#ccc'
                }}
              />
              {method}
            </span>
          }
        >
          {Object.entries(METHOD_COLORS).map(([m, color]) => (
            <NodeListboxOption key={m} value={m} isSelected={m === method}>
              <div className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: color[500] || '#ccc'
                  }}
                />
                {m}
              </div>
            </NodeListboxOption>
          ))}
        </NodeListbox>
      </NodeColumn>
      <NodeColumn label="Route Path">
        <NodeTextInput
          value={path}
          setValue={newValue => {
            updateNode(id, { path: newValue })
          }}
          placeholder="/route/path/:params"
        />
      </NodeColumn>
      <NodeColumn nodeType="route" handle="route-output" />
    </NodeColumnWrapper>
  )
}

export default RouteNode
