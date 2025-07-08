import colors from "tailwindcss/colors";
import SorterNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";

export default defineNodeConfig()({
  name: "Sorter",
  icon: "tabler:sort-ascending",
  component: SorterNode,
  color: colors.purple[500],
  handlers: {},
} as const);
