import type { SectionCopy } from "./ui";

export interface ApplyFormLabels {
  readonly fullName: string;
  readonly email: string;
  readonly phone: string;
  readonly guardianPhone: string;
  readonly target: string;
  readonly board: string;
  readonly schoolName: string;
  readonly class8Percentage: string;
  readonly class9Percentage: string;
  readonly class10PreBoardPercentage: string;
  readonly class10TotalMarks: string;
  readonly class10MaxMarks: string;
  readonly subjectName: string;
  readonly subjectObtained: string;
  readonly subjectMax: string;
  readonly academicAchievements: string;
  readonly address: string;
  readonly parentsName: string;
  readonly parentsProfession: string;
  readonly householdIncome: string;
  readonly selectPlaceholder: string;
}

export interface ApplyFormOptions {
  readonly targetJee: string;
  readonly targetNeet: string;
  readonly boardWbbse: string;
  readonly boardCbse: string;
  readonly boardIcse: string;
  readonly boardOther: string;
}

export interface ApplyFormSections {
  readonly percentagesTitle: string;
  readonly percentagesHelp: string;
  readonly totalsTitle: string;
  readonly subjectsTitle: string;
  readonly subjectsHelp: string;
}

export interface ApplyFormSuccess {
  readonly title: string;
  readonly body: string;
  readonly resetLabel: string;
}

export interface ApplyFormErrors {
  readonly submissionFailed: string;
  readonly network: string;
  readonly server: string;
}

export interface ApplyFormSubmit {
  readonly idle: string;
  readonly pending: string;
}

export interface ApplyFormContent {
  readonly labels: ApplyFormLabels;
  readonly options: ApplyFormOptions;
  readonly sections: ApplyFormSections;
  readonly subjectDefaults: readonly [
    string,
    string,
    string,
    string,
    string,
  ];
  readonly success: ApplyFormSuccess;
  readonly errors: ApplyFormErrors;
  readonly submit: ApplyFormSubmit;
}

export interface ApplyContent {
  readonly meta: SectionCopy;
  readonly heading: SectionCopy;
  readonly form: ApplyFormContent;
}
