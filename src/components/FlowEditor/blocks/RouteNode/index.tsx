import METHOD_COLORS from "./constants/method_colors";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import NodeColumn from "../../components/NodeColumn";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import NodeTextInput from "../../components/NodeTextInput";
import type { IDataWithUpdater } from "../../typescript/node";
import type { IRouteNodeData } from "./types";

function RouteNode({
  data: { method, path, onUpdate },
}: {
  data: IDataWithUpdater<IRouteNodeData>;
}) {
  return (
    <NodeColumnWrapper>
      <NodeColumn
        label="Router"
        handle={{
          id: "router-input",
          nodeType: "router",
        }}
      />
      <NodeColumn label="HTTP Method">
        <Listbox
          value={method}
          onChange={(value) => onUpdate({ method: value })}
        >
          <ListboxButton className="w-full border border-bg-200 dark:border-bg-800 component-bg-lighter rounded-md pr-2 h-10 pl-3 flex-between">
            <span className="flex items-center gap-2 font-medium text-bg-500">
              <span
                className="size-2 rounded-full"
                style={{
                  backgroundColor: METHOD_COLORS[method]?.[500] || "#ccc",
                }}
              />
              {method}
            </span>
            <Icon icon="tabler:chevron-down" className="text-bg-400" />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-(--button-width) rounded-lg border border-bg-200 dark:border-bg-700 bg-bg-100 dark:bg-bg-800 border shadow-custom p-1 [--anchor-gap:--spacing(2)] focus:outline-none",
              "transition duration-100 ease-in data-leave:data-closed:opacity-0"
            )}
          >
            {Object.entries(METHOD_COLORS).map(([method, color]) => (
              <ListboxOption
                key={method}
                value={method}
                className="flex items-center text-base gap-3 text-bg-500 p-2 rounded hover:bg-bg-100 focus:bg-bg-100 dark:hover:bg-bg-700/50 dark:focus:bg-bg-700/50 focus:outline-none transition-colors"
              >
                <span
                  className="size-2 rounded-full"
                  style={{
                    backgroundColor: color[500] || "#ccc",
                  }}
                />
                {method}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </NodeColumn>
      <NodeColumn label="Route Path">
        <NodeTextInput
          value={path}
          setValue={(newValue) => {
            onUpdate({ path: newValue });
          }}
          placeholder="/route/path/:params"
        />
      </NodeColumn>
      <NodeColumn
        label="Route"
        position="right"
        handle={{
          id: "route-output",
          nodeType: "route",
        }}
      />
    </NodeColumnWrapper>
  );
}

export default RouteNode;
