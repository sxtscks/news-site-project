import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { AuthSchema } from 'features/AuthByUsername';
import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsComments } from 'pages/ArticleDetailsPage';
import { AddNewCommentSchema } from 'features/AddNewComment';
import { ArticlePageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
  counter: CounterSchema;
  user: UserSchema;
  auth?: AuthSchema;
  profile?: ProfileSchema;
  articleDetails?: ArticleDetailsSchema;
  articlesPage?: ArticlePageSchema;
  articleDetailsComments?: ArticleDetailsComments
  addNewComment?: AddNewCommentSchema
}

export type StateSchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}
