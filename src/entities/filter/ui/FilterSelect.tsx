'use client';

import { filterSelector } from '@entities/filter/model/filter.selector';
import { setFilter } from '@entities/filter/model/filter.slice';
import { SearchFilterType } from '@entities/task/model/task.types';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { DescriptionIcon, NameIcon } from '@shared/ui/icons';
import Select from '@shared/ui/select/Select';

const FilterSelect: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, value: storeValue } = useAppSelector(filterSelector);

  const handleSelect = (value: string) => {
    dispatch(setFilter({ type: value as SearchFilterType }));
  };

  return (
    <Select
      value={type}
      options={options}
      onChange={handleSelect}
      Icon={Icon[type]}
    />
  );
};

export default FilterSelect;

const options = [
  { value: SearchFilterType.NAME, label: 'Название' },
  { value: SearchFilterType.DESCRIPTION, label: 'Описание' },
];

const Icon: Record<Partial<SearchFilterType>, React.ComponentType> = {
  [SearchFilterType.NAME]: NameIcon,
  [SearchFilterType.DESCRIPTION]: DescriptionIcon,
};
