import type { NodeProps } from "@xyflow/react";

export type INodeConfig<T extends Record<string, any> | undefined> = {
  name: string;
  icon: string;
  component: React.ComponentType<NodeProps & { data: IDataWithUpdater<T> }>;
  color: string;
} & (T extends undefined
  ? { data?: never }
  : {
      data: T;
    });

export type IDataWithUpdater<T> = T & {
  onUpdate: (data: Partial<T>) => void;
};
