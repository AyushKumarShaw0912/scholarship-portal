export interface Teacher {
  subject: string;
  name: string;
}

export interface DocumentRequirement {
  id: string;
  title: string;
  description?: string;
  required: boolean;
}

export interface Benefit {
  id: string;
  title: string;
  description?: string;
}
