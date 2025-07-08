import colors from "tailwindcss/colors";
import RouteNode from "./index";
import defineNodeConfig from "../../utils/defineConfig";
import { type IRouteNodeData } from "./types";

export default defineNodeConfig<IRouteNodeData>()({
  name: "Route",
  icon: "tabler:route",
  component: RouteNode,
  color: colors.orange[500],
  data: {
    method: "GET",
    path: "",
  },
  handlers: {
    "router-input": {
      label: "Router",
      nodeType: "router",
      cardinality: 1,
      filter: {
        handler: ["router-output"],
      },
    },
    "route-output": {
      label: "Route",
      nodeType: "route",
      cardinality: 1,
      filter: {
        handler: ["route-input"],
      },
    },
  },
} as const);
