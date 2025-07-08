import { ModalHeader, SearchInput } from "@lifeforge/ui";
import { useState } from "react";
import NODE_CONFIG, { NODES_CATEGORIES } from "../nodes";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { oklchToHex } from "../../../utils/colors";

function NodeSelector({
  onClose,
  data: { onSelect },
}: {
  onClose: () => void;
  data: {
    onSelect: (nodeType: keyof typeof NODE_CONFIG) => void;
  };
}) {
  const { t } = useTranslation("core.apiBuilder");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-w-[300px]">
      <ModalHeader
        namespace="core.apiBuilder"
        title="New Node"
        icon="tabler:plus"
        onClose={onClose}
      />
      <SearchInput
        namespace="core.apiBuilder"
        stuffToSearch="node"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lighter
      />
      {NODES_CATEGORIES.map((category) => (
        <div key={category.name} className="mt-6">
          <h3 className="text-lg font-semibold mb-2">
            {t([`nodeCategories.${_.camelCase(category.name)}`, category.name])}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {category.nodes
              .filter((key) => {
                const config = NODE_CONFIG[key];
                return (
                  config.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  t([`nodes.${_.camelCase(config.name)}`, config.name])
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                );
              })
              .map((key) => {
                const config = NODE_CONFIG[key];
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 p-3 text-bg-500 rounded component-bg-with-hover hover:text-bg-900 dark:hover:text-bg-100 cursor-pointer"
                    onClick={() => {
                      onSelect(key);
                      onClose();
                    }}
                  >
                    <div
                      className="size-8 shrink-0 rounded-md flex-center"
                      style={{
                        backgroundColor: oklchToHex(config.color) + "20",
                      }}
                    >
                      <Icon
                        icon={config.icon || "tabler:circle"}
                        className="size-5"
                        style={{
                          color: config.color || "#000",
                        }}
                      />
                    </div>
                    <span className="truncate">
                      {t([`nodes.${_.camelCase(config.name)}`, config.name])}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NodeSelector;
