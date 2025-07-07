import { Button, useModalStore } from "@lifeforge/ui";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import type { ICollectionNodeData } from "./types";
import CollectionSelector from "./components/CollectionSelector";
import NodeColumn from "../../components/NodeColumn";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useNodeData, useUpdateNodeData } from "../..";

function CollectionNode({ id }: { id: string }) {
  const { name, type, fields } = useNodeData<ICollectionNodeData>(id);
  const updateNode = useUpdateNodeData();
  const open = useModalStore((s) => s.open);

  return (
    <NodeColumnWrapper>
      <NodeColumn label="Collection">
        {!name ? (
          <Button
            onClick={() => {
              open(CollectionSelector, {
                onSelect: (selectedCollection: {
                  name: string;
                  type: "base" | "view";
                  fields: { name: string; type: string }[];
                }) => {
                  updateNode(id, selectedCollection);
                },
              });
            }}
            icon="tabler:folder"
            className="p-2! w-full"
            variant="secondary"
          >
            Select
          </Button>
        ) : (
          <div className="border border border-bg-200 dark:border-bg-800 component-bg-lighter gap-2 rounded-md h-10 flex items-center px-3 w-full">
            <Icon
              icon={type === "base" ? "tabler:folder" : "tabler:columns-3"}
              className="size-5 text-bg-500"
            />
            <span className="truncate">{name}</span>
          </div>
        )}
      </NodeColumn>
      {fields.length > 0 && (
        <NodeColumn label="Fields">
          <div className="flex flex-col gap-1">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded border border-bg-200 dark:border-bg-800 component-bg-lighter"
              >
                <span className="text-bg-600 dark:text-bg-400">
                  {field.name}
                </span>
                <span className="text-bg-500">{field.type}</span>
              </div>
            ))}
          </div>
        </NodeColumn>
      )}
      <NodeColumn
        handle={{
          id: "collection-output",
          nodeType: "collection",
        }}
        position="right"
        label="Collection"
      />
    </NodeColumnWrapper>
  );
}

export default CollectionNode;
