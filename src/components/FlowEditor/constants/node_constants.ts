import colors from "tailwindcss/colors";
import RequestSchemaNode from "../blocks/RequestSchemaNode";
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
import type { IPickFieldsFromSchemaNodeData } from "../blocks/SchemaPickFieldsNode/types";
import SchemaPickFieldsNode from "../blocks/SchemaPickFieldsNode";
import ServiceNode from "../blocks/ServiceNode";
import type { ICollectionNodeData } from "../blocks/CollectionNode/types";
import CollectionNode from "../blocks/CollectionNode";
import GetFullListNode from "../blocks/GetFullListNode";
import DatabaseCRUDAction from "../blocks/DatabaseCRUDAction";
import type { IFilterNodeData } from "../blocks/FilterNode/types";
import FilterNode from "../blocks/FilterNode";
import type { IValueNodeData } from "../blocks/ValueNode/types";
import ValueNode from "../blocks/ValueNode";
import SorterNode from "../blocks/SorterNode";
import CollectionPickFieldsNode from "../blocks/CollectionPickFieldsNode";

const NODE_CONFIG: {
  collection: INodeConfig<ICollectionNodeData>;
  filter: INodeConfig<IFilterNodeData>;
  sorter: INodeConfig<undefined>;
  collectionPickFields: INodeConfig<undefined>;
  getFullList: INodeConfig<undefined>;
  value: INodeConfig<IValueNodeData>;
  schema: INodeConfig<ISchemaNodeData>;
  schemaWithPB: INodeConfig<ISchemaNodeData>;
  schemaArray: INodeConfig<undefined>;
  requestSchema: INodeConfig<undefined>;
  schemaPickFields: INodeConfig<IPickFieldsFromSchemaNodeData>;
  router: INodeConfig<IRouterNodeData>;
  route: INodeConfig<IRouteNodeData>;
  controller: INodeConfig<undefined>;
  service: INodeConfig<undefined>;
  databaseCRUDAction: INodeConfig<undefined>;
} = {
  collection: {
    name: "Collection",
    icon: "tabler:folder",
    component: CollectionNode,
    color: colors.sky[500],
    data: {
      name: "",
      type: "base",
      fields: [],
    },
  },
  filter: {
    name: "Filter",
    icon: "tabler:filter",
    component: FilterNode,
    color: colors.purple[500],
    data: {
      columnName: "",
      comparator: "",
    } as IFilterNodeData,
  },
  sorter: {
    name: "Sorter",
    icon: "tabler:sort-ascending",
    component: SorterNode,
    color: colors.purple[500],
  },
  collectionPickFields: {
    name: "Collection Pick Fields",
    icon: "tabler:checklist",
    component: CollectionPickFieldsNode,
    color: colors.purple[500],
  },
  getFullList: {
    name: "Get Full List",
    icon: "tabler:list-search",
    component: GetFullListNode,
    color: colors.sky[500],
  },
  value: {
    name: "Value",
    icon: "tabler:number-123",
    component: ValueNode,
    color: colors.yellow[500],
    data: {
      value: "",
      dataType: "string",
    } as IValueNodeData,
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
    data: {
      name: "SchemaWithPB",
      fields: [],
    } as ISchemaNodeData,
  },
  requestSchema: {
    name: "Request Schema",
    icon: "tabler:forms",
    component: RequestSchemaNode,
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
    component: SchemaPickFieldsNode,
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
  databaseCRUDAction: {
    name: "Database CRUD Action",
    icon: "tabler:database",
    component: DatabaseCRUDAction,
    color: colors.green[500],
  },
} as const;

const NODES_CATEGORIES: {
  name: string;
  nodes: (keyof typeof NODE_CONFIG)[];
}[] = [
  {
    name: "Database",
    nodes: [
      "collection",
      "filter",
      "sorter",
      "collectionPickFields",
      "getFullList",
    ],
  },
  {
    name: "Variables",
    nodes: ["value"],
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
    nodes: ["controller", "service", "databaseCRUDAction"],
  },
];

export default NODE_CONFIG;
export { NODES_CATEGORIES };
