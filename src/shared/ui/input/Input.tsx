import React from 'react';

import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isFullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', isFullWidth, ...props }) => {
  return (
    <div className={clsx(isFullWidth && 'w-full')}>
      {label && <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>}
      <input
        className={clsx(cls, error && 'border-red-500 focus:ring-red-500', className)}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const cls = `w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`;
