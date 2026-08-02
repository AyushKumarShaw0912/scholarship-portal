import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

import { ROUTES } from "@/constants/routes";

function safeRevalidate(
  paths: Array<string | { path: string; type?: "page" | "layout" }>,
  log?: { error: (args: unknown) => void },
) {
  for (const entry of paths) {
    const path = typeof entry === "string" ? entry : entry.path;
    const type = typeof entry === "string" ? undefined : entry.type;

    try {
      if (type) {
        revalidatePath(path, type);
      } else {
        revalidatePath(path);
      }
    } catch (error) {
      log?.error({
        err: error,
        msg: `[revalidate] Failed to revalidate path: ${path}`,
      });
    }
  }
}

export const revalidateSiteGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([{ path: ROUTES.HOME, type: "layout" }], payload.logger);
  return doc;
};

export const revalidateHomeGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([ROUTES.HOME], payload.logger);
  return doc;
};

export const revalidateAboutGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([ROUTES.ABOUT], payload.logger);
  return doc;
};

export const revalidateContactGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([ROUTES.CONTACT], payload.logger);
  return doc;
};

export const revalidateApplyGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([ROUTES.APPLY], payload.logger);
  return doc;
};

export const revalidateFaqGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate([ROUTES.FAQ, ROUTES.HOME], payload.logger);
  return doc;
};

export const revalidateScholarshipPageGlobal: GlobalAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  safeRevalidate(
    [{ path: ROUTES.SCHOLARSHIPS, type: "layout" }],
    payload.logger,
  );
  return doc;
};

function revalidateScholarshipPaths(
  slug: unknown,
  log?: { error: (args: unknown) => void },
) {
  const paths: Array<string | { path: string; type?: "page" | "layout" }> = [
    ROUTES.HOME,
    ROUTES.SCHOLARSHIPS,
  ];

  if (typeof slug === "string" && slug.length > 0) {
    paths.push(`${ROUTES.SCHOLARSHIPS}/${slug}`);
  }

  safeRevalidate(paths, log);
}

export const revalidateScholarshipAfterChange: CollectionAfterChangeHook = ({
  doc,
  req: { payload },
}) => {
  revalidateScholarshipPaths(doc?.slug, payload.logger);
  return doc;
};

export const revalidateScholarshipAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload },
}) => {
  revalidateScholarshipPaths(doc?.slug, payload.logger);
  return doc;
};
