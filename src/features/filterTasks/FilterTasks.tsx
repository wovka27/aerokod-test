'use client';

import { useEffect, useMemo, useState } from 'react';

import { clearFilter, setFilter } from '@entities/filter/model/filter.slice';
import { SearchFilterType } from '@entities/task/model/task.types';
import { useDebounced } from '@shared/lib/hooks/debounced';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks/redux';
import { SearchInput } from '@shared/ui/search-input/SearchInput';
import Select from '@shared/ui/select/Select';

const FilterTasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, value: storeValue } = useAppSelector((state) => state.filter);

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

  const getFilterIcon = () => {
    switch (type) {
      case SearchFilterType.NAME:
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        );
      case SearchFilterType.DESCRIPTION:
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const handleClear = () => {
    setValue('');
    dispatch(clearFilter());
  };

  const handleSelect = (value: string) => {
    dispatch(setFilter({ type: value as SearchFilterType }));
  };

  useEffect(() => {
    dispatch(setFilter({ value: debouncedValue.trim() }));
  }, [debouncedValue, dispatch]);

  useEffect(() => {
    if (!storeValue) setValue('');
  }, [storeValue]);

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        placeholder={searchPlaceholder}
        value={value}
        onChange={setValue}
        onClear={handleClear}
        className="flex-1"
      />
      <Select
        value={type}
        options={[
          { value: SearchFilterType.NAME, label: 'Название' },
          { value: SearchFilterType.DESCRIPTION, label: 'Описание' },
        ]}
        onChange={handleSelect}
        Icon={() => getFilterIcon()}
      />
    </div>
  );
};

export default FilterTasks;
