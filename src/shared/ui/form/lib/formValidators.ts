export const formValidators = {
  required:
    (msg = 'Обязательное поле') =>
    (v: any) =>
      v === null || v === undefined || v === '' ? msg : null,
  minLength: (len: number, msg?: string) => (v: string) =>
    v && v.length < len ? (msg ?? `Must be at least ${len} characters`) : null,
  email:
    (msg = 'Неверный формат email') =>
    (v: string) =>
      v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? msg : null,
};
