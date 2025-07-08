import colors from "tailwindcss/colors";
import ValueNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";
import { type IValueNodeData } from "./types";

export default defineNodeConfig<IValueNodeData>()({
  name: "Value",
  icon: "tabler:number-123",
  component: ValueNode,
  color: colors.yellow[500],
  data: {
    value: "",
    dataType: "string",
  },
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
