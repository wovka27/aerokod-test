import { useCallback, useMemo, useState } from 'react';

import { formValidators } from '@shared/ui/form/lib/formValidators';

export const useForm = <T extends Record<string, ReturnType<typeof createField>>>(fields: T) => {
  const getValuesFlat = useCallback((obj: Record<string, any>): any => {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const val = obj[key];
      if (val && typeof val === 'object' && 'value' in val) {
        result[key] = val.value;
      } else if (val && typeof val === 'object') {
        Object.assign(result, getValuesFlat(val));
      }
    }

    return result;
  }, []);

  const values = useMemo(() => getValuesFlat(fields), [fields, getValuesFlat]);

  const isValid = useMemo(() => {
    const checkValid = (obj: Record<string, any>): boolean =>
      Object.values(obj).every((v) => {
        if (v && typeof v === 'object' && 'error' in v) return v.error === null;
        if (v && typeof v === 'object') return checkValid(v);
        return true;
      });
    return checkValid(fields);
  }, [fields]);

  const validate = useCallback(async (): Promise<boolean> => {
    const walkValidate = async (obj: Record<string, any>): Promise<boolean> => {
      const results = await Promise.all(
        Object.values(obj).map(async (v) => {
          if (v && typeof v === 'object' && 'validate' in v) {
            return v.validate();
          } else if (v && typeof v === 'object') {
            return walkValidate(v);
          }
          return true;
        })
      );
      return results.every(Boolean);
    };

    return walkValidate(fields);
  }, [fields]);

  const reset = useCallback(() => {
    const walkReset = (obj: Record<string, any>) => {
      Object.values(obj).forEach((v) => {
        if (v && typeof v === 'object' && 'reset' in v) v.reset();
        else if (v && typeof v === 'object') walkReset(v);
      });
    };

    walkReset(fields);
  }, [fields]);

  const handleSubmit = useCallback(
    async (submit: (val: typeof values) => Promise<void> | void) => {
      if (!(await validate())) return;
      await submit(values);
    },
    [validate, values]
  );

  return { fields, values, isValid, validate, reset, handleSubmit };
};

export const createField = <T>(options: {
  initialValue: T;
  validators?: ((v: T) => string | null | Promise<string | null>)[];
}) => {
  const [value, setValue] = useState<T>(options.initialValue);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validate = useCallback(async (): Promise<boolean> => {
    setTouched(true);
    const validators = options.validators ?? [];
    for (const validator of validators) {
      const result = await validator(value);
      if (result) {
        setError(result);
        return false;
      }
    }

    if (!error && formValidators.required()(value)) {
      setError(formValidators.required()(value));
      return false;
    }

    setError(null);
    return true;
  }, [value, options.validators]);

  const reset = useCallback(() => {
    setValue(options.initialValue);
    setError(null);
    setTouched(false);
  }, [options.initialValue]);

  const onBlur = useCallback(() => {
    void validate();
  }, [validate]);

  const onFocus = useCallback(() => {
    setTouched(false);
  }, []);

  return { value, setValue, error, touched, validate, reset, onBlur, onFocus };
};
