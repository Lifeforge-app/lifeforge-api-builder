import colors from "tailwindcss/colors";
import DatabaseCRUDAction from "./index";
import defineNodeConfig from "../../utils/defineConfig";

export default defineNodeConfig()({
  name: "Database CRUD Action",
  icon: "tabler:database",
  component: DatabaseCRUDAction,
  color: colors.green[500],
  handlers: {
    "db-operation-input": {
      label: "Database Action",
      nodeType: "getFullList",
      cardinality: 1,
      filter: {
        handler: ["db-operation-output"],
      },
    },
    "action-output": {
      label: "Action",
      nodeType: "databaseCRUDAction",
      cardinality: 1,
      filter: {
        handler: ["action-input"],
      },
    },
  },
} as const);
