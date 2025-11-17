'use client';

import FilterSearch from '@entities/filter/ui/FilterSearch';
import FilterSelect from '@entities/filter/ui/FilterSelect';

const Filter: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <FilterSearch />
      <FilterSelect />
    </div>
  );
};

export default Filter;
