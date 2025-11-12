import type { FieldConfig } from '@shared/ui/form/model';

export const fields: FieldConfig[] = [
  {
    id: 'group',
    type: 'group',
    containerClassName: 'grid grid-flow-col gap-5',
    fields: [
      { id: 'name', type: 'text', label: 'Название задачи', isFullWidth: true },
      {
        id: 'estimatedTime',
        type: 'time',
        label: 'Время на выполнение',
        className: 'flex-shrink-0',
        validators: [(v) => (v === '00:00' ? 'Время должно быть больше 0' : null)],
      },
    ],
  },
  { id: 'description', type: 'textarea', label: 'Описание задачи' },
];
