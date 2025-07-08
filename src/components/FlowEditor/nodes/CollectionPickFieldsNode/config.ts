import colors from "tailwindcss/colors";
import CollectionPickFieldsNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";

export default defineNodeConfig()({
  name: "Collection Pick Fields",
  icon: "tabler:checklist",
  component: CollectionPickFieldsNode,
  color: colors.purple[500],
  handlers: {},
} as const);
