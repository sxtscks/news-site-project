import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import {
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { articlesDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { authReducer } from '@/features/AuthByUsername/testing';
import { addNewCommentReducer } from '@/features/AddNewComment/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';

const defaultAsyncReducers: ReducerList = {
  auth: authReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addNewComment: addNewCommentReducer,
  articleDetailsPage: articlesDetailsPageReducer,
};

export const StoreDecorator = (
  state: DeepPartial<StateSchema>,
  asyncReducers?: ReducerList,
) => (StoryComponent: Story) => (
  <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
    <StoryComponent />
  </StoreProvider>
);
