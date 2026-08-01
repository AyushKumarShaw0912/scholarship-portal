export interface StatusAction {
  readonly label: string;
  readonly href?: string;
  readonly action?: "reset";
  readonly variant?: "default" | "outline";
}

export interface StatusContent {
  readonly title: string;
  readonly description: string;
  readonly code?: string;
  readonly primaryAction: StatusAction;
  readonly secondaryAction: StatusAction;
}

export interface SystemCopy {
  readonly notFound: StatusContent;
  readonly error: StatusContent;
  readonly loading: string;
}
