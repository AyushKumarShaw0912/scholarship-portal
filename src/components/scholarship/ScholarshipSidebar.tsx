import { uiCopy } from "@/data";
import { getScholarshipPageContent, getSiteSettings } from "@/lib/cms";
import { ContentCard } from "@/components/common/ContentCard";
import { CtaLink } from "@/components/actions/CtaLink";

export async function ScholarshipSidebar() {
  const [{ detail }, site] = await Promise.all([
    getScholarshipPageContent(),
    getSiteSettings(),
  ]);
  const { sidebar } = detail;

  return (
    <aside className="lg:sticky lg:top-28">
      <ContentCard as="div" hover="shadow" className="p-5 shadow-sm">
        <h2 className="text-xl font-semibold">{sidebar.title}</h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {sidebar.description}
        </p>

        <div className="mt-6 space-y-4">
          {sidebar.features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.label} className="flex items-center gap-3">
                <Icon className="size-5 text-primary" />
                <span className="text-sm">{feature.label}</span>
              </div>
            );
          })}
        </div>

        <CtaLink
          href={site.applyUrl}
          label={uiCopy.applyNow}
          appearance="sidebar"
          external
          showExternalIcon
          className="mt-6"
        />

        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          {sidebar.footerNote}
        </p>
      </ContentCard>
    </aside>
  );
}
