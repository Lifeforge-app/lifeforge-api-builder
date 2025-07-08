import colors from "tailwindcss/colors";
import ValueFromRequestNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";

export default defineNodeConfig()({
  name: "Value From Request",
  icon: "tabler:arrow-down",
  component: ValueFromRequestNode,
  color: colors.yellow[500],
  handlers: {
    "value-output": {
      label: "Value",
      nodeType: "value",
      cardinality: "many",
      filter: {
        handler: ["value-input"],
      },
    },
  },
} as const);
