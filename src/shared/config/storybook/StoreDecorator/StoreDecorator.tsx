import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { authReducer } from 'features/AuthByUsername/model/slice/authSlice';
import { profileReducer } from 'entities/Profile';
import {
  ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from 'entities/Article';
import {
  addNewCommentReducer,
} from 'features/AddNewComment/model/slices/addNewCommentSlice';
import { articlesDetailsPageReducer } from 'pages/ArticleDetailsPage';

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
