import { ModalHeader, QueryWrapper } from "@lifeforge/ui";
import useAPIQuery from "../../../../../hooks/useAPIQuery";

function CollectionSelector({
  onClose,
  data: { onSelect },
}: {
  onClose: () => void;
  data: {
    onSelect: (collectionName: string) => void;
  };
}) {
  const collectionsQuery = useAPIQuery<
    {
      name: string;
      type: "base" | "view";
    }[]
  >("/database/collections", ["database", "collections"]);

  return (
    <>
      <ModalHeader
        namespace="core.apiBuilder"
        title="Select Collection"
        icon="tabler:folder"
        onClose={onClose}
      />
      <QueryWrapper query={collectionsQuery}>
        {(data) => <>{JSON.stringify(data, null, 2)}</>}
      </QueryWrapper>
    </>
  );
}

export default CollectionSelector;
