// import { createSelector } from 'reselect'

export const getUsers = state => state.usersPage.usersData
export const getPage = state => state.usersPage.pageSize
export const getTotalCount = state => state.usersPage.totalCount
export const getCurrentPage = state => state.usersPage.currentPage
export const getIsFetching = state => state.usersPage.isFetching
export const getFollowind = state => state.usersPage.followindInProgress


// export const getUsersSuper = createSelector(getUsers, usersData => usersData.filter(n => true)); 