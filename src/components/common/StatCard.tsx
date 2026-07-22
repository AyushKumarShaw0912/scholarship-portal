interface StatCardProps {
  readonly value: string;
  readonly label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <h3 className="text-3xl font-bold text-primary">{value}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
