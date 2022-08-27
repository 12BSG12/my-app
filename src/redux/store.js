import {combineReducers, configureStore} from '@reduxjs/toolkit'
import profileReducer from './reducers/profile';
import dialogsReducer from './reducers/dialogs';
import sidebarReducer from './reducers/sidebar';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';
import { sidebarApi } from './reducers/sidebarAPI';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  // sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  [sidebarApi.reducerPath]: sidebarApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sidebarApi.middleware),
});

// export default store;