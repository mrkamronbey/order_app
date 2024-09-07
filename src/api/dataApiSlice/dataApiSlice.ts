import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type RequestPayload = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: any
}

type GetSinglePayload = {
  url: string
  id: number | null
}

export const dataApiSlice = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    request: builder.mutation<any, RequestPayload>({
      query: (requestPayload) => ({
        url: requestPayload.url,
        method: requestPayload.method,
        body: requestPayload.body,
      }),
    }),
    getSingle: builder.query<any, GetSinglePayload>({
      query: ({ url, id }) => ({
        url: `${url}/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useRequestMutation, useGetSingleQuery } = dataApiSlice
