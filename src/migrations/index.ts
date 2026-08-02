import * as migration_20260802_041617_initial from './20260802_041617_initial';

export const migrations = [
  {
    up: migration_20260802_041617_initial.up,
    down: migration_20260802_041617_initial.down,
    name: '20260802_041617_initial'
  },
];
