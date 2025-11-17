'use client';

import { useEffect, useMemo, useState } from 'react';

import { filterSelector } from '@entities/filter/model/filter.selector';
import { clearFilter, setFilter } from '@entities/filter/model/filter.slice';
import { SearchFilterType } from '@entities/task/model/task.types';
import { useDebounced } from '@shared/lib/hooks/debounced';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { SearchInput } from '@shared/ui/search-input/SearchInput';

const FilterSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, value: storeValue } = useAppSelector(filterSelector);
  const [value, setValue] = useState(storeValue);
  const debouncedValue = useDebounced(value, 500);

  const searchPlaceholder = useMemo(() => {
    switch (type) {
      case SearchFilterType.NAME:
        return 'Поиск по названию задачи...';
      case SearchFilterType.DESCRIPTION:
        return 'Поиск по описанию задачи...';
      default:
        return '';
    }
  }, [type]);

  const handleClear = () => {
    setValue('');
    dispatch(clearFilter());
  };

  useEffect(() => {
    dispatch(setFilter({ value: debouncedValue.trim() }));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    if (!storeValue) setValue('');
  }, [storeValue]);

  return (
    <SearchInput
      placeholder={searchPlaceholder}
      value={value}
      onChange={setValue}
      onClear={handleClear}
      className="flex-1"
    />
  );
};

export default FilterSearch;
