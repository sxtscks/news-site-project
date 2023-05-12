import { StateSchema } from '@/app/providers/StoreProvider';

export const getCommentText = (state: StateSchema) =>
  state.addNewComment?.text ?? '';
export const getCommentError = (state: StateSchema) =>
  state.addNewComment?.error;
