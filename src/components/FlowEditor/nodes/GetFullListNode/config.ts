import colors from "tailwindcss/colors";
import GetFullListNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";

export default defineNodeConfig()({
  name: "Get Full List",
  icon: "tabler:list-search",
  component: GetFullListNode,
  color: colors.sky[500],
  handlers: {
    "collection-input": {
      label: "Collection",
      nodeType: "collection",
      cardinality: 1,
      filter: {
        handler: ["collection-output"],
      },
    },
    "filter-input": {
      label: "Filter",
      nodeType: "filter",
      cardinality: "many",
      filter: {
        handler: ["filter-output"],
      },
    },
    "sorter-input": {
      label: "Sorter",
      nodeType: "sorter",
      cardinality: 1,
      filter: {
        handler: ["sorter-output"],
      },
    },
    "collection-pick-fields-input": {
      label: "Collection Pick Fields",
      nodeType: "collectionPickFields",
      cardinality: 1,
      filter: {
        handler: ["collection-pick-fields-output"],
      },
    },
    "db-operation-output": {
      label: "Database Action",
      nodeType: "getFullList",
      cardinality: 1,
      filter: {
        handler: ["db-operation-input"],
      },
    },
  },
} as const);
