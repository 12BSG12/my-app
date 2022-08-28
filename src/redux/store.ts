import {combineReducers, configureStore} from '@reduxjs/toolkit'
import profileReducer from './reducers/profile';
import dialogsReducer from './reducers/dialogs';
import sidebarReducer from './reducers/sidebar';
import usersReducer from './reducers/users';
import authReducer from './reducers/auth';
import appReducer from './reducers/app';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
})

const store = configureStore({
  reducer: rootReducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch