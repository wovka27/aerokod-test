export type FieldConfig = {
  id: string;
  label?: string;
  type?: 'text' | 'number' | 'group' | 'time' | 'textarea';
  isFullWidth?: boolean;
  className?: string;
  containerClassName?: string;
  fields?: FieldConfig[];
  validators?: (<T>(v: T) => string | null | Promise<string | null>)[];
};

export interface FormGeneratorProps {
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  formClassName?: string;
}
