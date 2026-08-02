import * as migration_20260802_041617_initial from './20260802_041617_initial';
import * as migration_20260802_073956_apply_section_personal_family from './20260802_073956_apply_section_personal_family';
import * as migration_20260802_105000_applications_subject_marks from './20260802_105000_applications_subject_marks';
import * as migration_20260802_113500_apply_page from './20260802_113500_apply_page';
import * as migration_20260802_120400_applications_contact_fields from './20260802_120400_applications_contact_fields';
import * as migration_20260802_143000_shortlist_form_invite from './20260802_143000_shortlist_form_invite';

export const migrations = [
  {
    up: migration_20260802_041617_initial.up,
    down: migration_20260802_041617_initial.down,
    name: '20260802_041617_initial',
  },
  {
    up: migration_20260802_073956_apply_section_personal_family.up,
    down: migration_20260802_073956_apply_section_personal_family.down,
    name: '20260802_073956_apply_section_personal_family',
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
    name: '20260802_120400_applications_contact_fields'
  },
  {
    up: migration_20260802_143000_shortlist_form_invite.up,
    down: migration_20260802_143000_shortlist_form_invite.down,
    name: '20260802_143000_shortlist_form_invite',
  },
];
