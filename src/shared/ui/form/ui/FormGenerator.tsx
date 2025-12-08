'use client';

import React from 'react';

import type { FormEventHandler, PropsWithChildren } from 'react';

import { createField, useForm } from '@shared/ui/form/hooks/useForm';
import type { FieldConfig, FormGeneratorProps } from '@shared/ui/form/model';
import { Input } from '@shared/ui/input/Input';
import { Textarea } from '@shared/ui/textarea/Textarea';

export const FormGenerator: React.FC<PropsWithChildren<FormGeneratorProps>> = ({
  fields,
  onSubmit,
  formClassName,
  initialValues = {},
  children,
}) => {
  const createFields = (fields: FieldConfig[], initialValues: Record<string, string>) => {
    const obj: Record<string, any> = {};
    for (const field of fields) {
      if (field.type === 'group' && field.fields) {
        obj[field.id] = createFields(field.fields, initialValues);
      } else {
        const initialValue = initialValues[field.id] ?? '';
        obj[field.id] = createField({ initialValue, validators: field.validators });
      }
    }
    return obj;
  };

  const flatFields = createFields(fields, initialValues);

  const form = useForm(flatFields);

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await form.handleSubmit(onSubmit);
  };

  const renderFields = (fields: FieldConfig[], path: string[] = []) => {
    return fields.map((field) => {
      const currentPath = [...path, field.id];

      if (field.type === 'group' && field.fields) {
        return (
          <div
            key={field.id}
            className={field.containerClassName}
          >
            {renderFields(field.fields, currentPath)}
          </div>
        );
      }

      const fieldRef = currentPath.reduce((acc, key) => acc[key], form.fields);

      const props = {
        id: field.id,
        name: field.id,
        type: field.type,
        label: field.label,
        value: fieldRef.value,
        error: fieldRef.error,
        onBlur: fieldRef.onBlur,
        onFocus: fieldRef.onFocus,
        className: field.className,
      };

      switch (field.type) {
        case 'textarea':
          return (
            <Textarea
              {...props}
              key={field.id}
              onChange={(event) => fieldRef.setValue(event.target.value)}
            />
          );
        default:
          return (
            <Input
              {...props}
              key={field.id}
              isFullWidth={field.isFullWidth}
              onChange={(event) => fieldRef.setValue(event.target.value)}
            />
          );
      }
    });
  };

  return (
    <form
      onSubmit={submit}
      className={formClassName ?? 'flex flex-col gap-5'}
    >
      {renderFields(fields)}
      {children}
    </form>
  );
};
