import { Button, useModalStore } from "@lifeforge/ui";
import NodeColumnWrapper from "../../components/NodeColumnWrapper";
import type { IDataWithUpdater } from "../../typescript/node";
import type { ICollectionNodeData } from "./typts";
import CollectionSelector from "./components/CollectionSelector";

function CollectionNode({
  data: { collectionName, onUpdate },
}: {
  data: IDataWithUpdater<ICollectionNodeData>;
}) {
  const open = useModalStore((s) => s.open);

  return (
    <NodeColumnWrapper>
      <Button
        onClick={() => {
          open(CollectionSelector, {
            onSelect: (selectedCollectionName: string) => {
              onUpdate({ collectionName: selectedCollectionName });
            },
          });
        }}
        icon="tabler:folder"
        className="p-2! w-full"
        variant="secondary"
      >
        Select
      </Button>
    </NodeColumnWrapper>
  );
}

export default CollectionNode;
