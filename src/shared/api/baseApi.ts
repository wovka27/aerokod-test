import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: () => ({ data: null }),
  tagTypes: ['Task'],
  endpoints: () => ({}),
});
