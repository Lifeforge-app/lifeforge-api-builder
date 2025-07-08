import type { INodeConfig } from "../typescript/node";

export default function loadNodeConfigs() {
  const modules = import.meta.glob("../blocks/**/config.ts", { eager: true });

  const configs: Record<string, INodeConfig<any, any>> = {};

  for (const path in modules) {
    const mod = modules[path] as any;

    const config = mod.default;

    if (!config?.id) {
      console.warn(`⚠️ Skipped node config without id: ${path}`);
      continue;
    }

    configs[config.id] = config;
  }

  return configs;
}
