import colors from "tailwindcss/colors";
import RequestSchema from "../blocks/RequestSchema";
import SchemaNode from "../blocks/SchemaNode";
import WithPBNode from "../blocks/WithPBNode";
import RouterNode from "../blocks/RouterNode";
import RouteNode from "../blocks/RouteNode";
import ControllerNode from "../blocks/ControllerNode";
import type { ISchemaNodeData } from "../blocks/SchemaNode/types";
import type { IRouterNodeData } from "../blocks/RouterNode/types";
import type { IRouteNodeData } from "../blocks/RouteNode/types";
import type { INodeConfig } from "../typescript/node";
import SchemaArrayNode from "../blocks/SchemaArrayNode";
import type { IPickFieldsFromSchemaNodeData } from "../blocks/PickFieldsFromSchemaNode/types";
import PickFieldsFromSchemaNode from "../blocks/PickFieldsFromSchemaNode";
import ServiceNode from "../blocks/ServiceNode";
import type { ICollectionNodeData } from "../blocks/CollectionNode/typts";
import CollectionNode from "../blocks/CollectionNode";

const NODE_CONFIG: {
  collection: INodeConfig<ICollectionNodeData>;
  schema: INodeConfig<ISchemaNodeData>;
  schemaWithPB: INodeConfig<undefined>;
  schemaArray: INodeConfig<undefined>;
  requestSchema: INodeConfig<undefined>;
  schemaPickFields: INodeConfig<IPickFieldsFromSchemaNodeData>;
  router: INodeConfig<IRouterNodeData>;
  route: INodeConfig<IRouteNodeData>;
  controller: INodeConfig<undefined>;
  service: INodeConfig<undefined>;
} = {
  collection: {
    name: "Collection",
    icon: "tabler:folder",
    component: CollectionNode,
    color: colors.sky[500],
    data: {
      collectionName: "",
    },
  },
  schema: {
    name: "Schema",
    icon: "tabler:database",
    component: SchemaNode,
    color: colors.blue[500],
    data: {
      name: "New Schema",
      fields: [],
    },
  },
  schemaWithPB: {
    name: "With PocketBase Schema",
    icon: "simple-icons:pocketbase",
    component: WithPBNode,
    color: colors.blue[500],
  },
  requestSchema: {
    name: "Request Schema",
    icon: "tabler:forms",
    component: RequestSchema,
    color: colors.indigo[500],
  },
  schemaArray: {
    name: "Schema Array",
    icon: "tabler:list",
    component: SchemaArrayNode,
    color: colors.blue[500],
  },
  schemaPickFields: {
    name: "Pick Fields From Schema",
    icon: "tabler:checklist",
    component: PickFieldsFromSchemaNode,
    color: colors.blue[500],
    data: {
      fields: [],
    },
  },
  router: {
    name: "Router",
    icon: "tabler:router",
    component: RouterNode,
    color: colors.orange[500],
    data: {
      path: "",
    },
  },
  route: {
    name: "Route",
    icon: "tabler:route",
    component: RouteNode,
    color: colors.orange[500],
    data: {
      method: "GET",
      path: "",
    },
  },
  controller: {
    name: "Controller",
    icon: "tabler:settings",
    component: ControllerNode,
    color: colors.green[500],
  },
  service: {
    name: "Service",
    icon: "tabler:cpu",
    component: ServiceNode,
    color: colors.green[500],
  },
} as const;

const NODES_CATEGORIES: {
  name: string;
  nodes: (keyof typeof NODE_CONFIG)[];
}[] = [
  {
    name: "Database",
    nodes: ["collection"],
  },
  {
    name: "Schema",
    nodes: [
      "schema",
      "schemaWithPB",
      "schemaArray",
      "schemaPickFields",
      "requestSchema",
    ],
  },
  {
    name: "Routing",
    nodes: ["router", "route"],
  },
  {
    name: "Action",
    nodes: ["controller", "service"],
  },
];

export default NODE_CONFIG;
export { NODES_CATEGORIES };
