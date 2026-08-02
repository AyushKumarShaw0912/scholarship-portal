import type { CollectionConfig, GlobalConfig } from "payload";

/** Shared draft/publish workflow for editorial content. */
export const contentVersions = {
  maxPerDoc: 25,
  drafts: {
    autosave: {
      interval: 400,
      showSaveDraftButton: true,
    },
  },
} as const satisfies NonNullable<CollectionConfig["versions"]> &
  NonNullable<GlobalConfig["versions"]>;
