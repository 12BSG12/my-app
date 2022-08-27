import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { api } from '../../api/api';

export const sidebarApi = createApi({
  reducerPath: 'sidebarApi',
  tagTypes: ['Friends'],
  baseQuery: fetchBaseQuery({
    ...api,
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (currentPage) => ({
        url: `users?page=${currentPage}&count=10`
      }),
      transformResponse: (response) => ({
        usersData: response.items,
        totalCount: response.totalCount,
      }),
    }),
    postFollow: build.mutation({
      query: (id, body) => ({
        url: `follow/${id}`,
        method: 'POST',
      })
    }),
    getFriends: build.query({
      query: (page) => ({
        url: `users?friend=true&page=${page}&count=4`,
      }),
      providesTags: ['Friends'],
      transformResponse: (response) => ({
        friendsData: response.items,
        totalCount: response.totalCount,
      }),
    })
  })
})

export const { useGetFriendsQuery, useGetUsersQuery, usePostFollowMutation } = sidebarApi;