import * as migration_20260802_041617_initial from './20260802_041617_initial';
import * as migration_20260802_105000_applications_subject_marks from './20260802_105000_applications_subject_marks';
import * as migration_20260802_113500_apply_page from './20260802_113500_apply_page';
import * as migration_20260802_120400_applications_contact_fields from './20260802_120400_applications_contact_fields';

export const migrations = [
  {
    up: migration_20260802_041617_initial.up,
    down: migration_20260802_041617_initial.down,
    name: '20260802_041617_initial',
  },
  {
    up: migration_20260802_105000_applications_subject_marks.up,
    down: migration_20260802_105000_applications_subject_marks.down,
    name: '20260802_105000_applications_subject_marks',
  },
  {
    up: migration_20260802_113500_apply_page.up,
    down: migration_20260802_113500_apply_page.down,
    name: '20260802_113500_apply_page',
  },
  {
    up: migration_20260802_120400_applications_contact_fields.up,
    down: migration_20260802_120400_applications_contact_fields.down,
    name: '20260802_120400_applications_contact_fields',
  },
];
