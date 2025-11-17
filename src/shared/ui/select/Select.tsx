import { useCallback } from 'react';

import clsx from 'clsx';
import type { ChangeEventHandler } from 'react';

import { ArrowDownIcon } from '@shared/ui/icons';

interface IProps {
  Icon?: React.ComponentType;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  value: string;
  id?: string;
}
const Select: React.FC<IProps> = ({ Icon, className, options, onChange, ...props }) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (event) => onChange?.(event.target.value),
    [onChange]
  );

  return (
    <div className="relative">
      <select
        {...props}
        onChange={handleChange}
        className={clsx(selectClasses, className)}
      >
        <SelectOptions options={options} />
      </select>

      <SelectIcon Icon={Icon} />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
        <ArrowDownIcon />
      </div>
    </div>
  );
};

const selectClasses =
  'appearance-none pl-11 pr-10 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer hover:border-gray-600 hover:shadow-lg hover:shadow-blue-500/10 min-w-[160px] [&>option]:bg-gray-800 [&>option]:text-white';

const SelectIcon: React.FC<Pick<IProps, 'Icon'>> = ({ Icon }) => {
  if (!Icon) return null;

  return (
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-400">
      <Icon />
    </div>
  );
};

const SelectOptions: React.FC<Pick<IProps, 'options'>> = ({ options }) => {
  return options.map(({ label, value }) => (
    <option
      key={label}
      value={value}
      className="bg-gray-800 text-white"
    >
      {label}
    </option>
  ));
};
export default Select;
