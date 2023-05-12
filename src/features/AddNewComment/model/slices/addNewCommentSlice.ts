import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCommentSchema } from '../types/addNewComment';

const initialState: AddNewCommentSchema = {
  text: '',
};

const addNewCommentSlice = createSlice({
  name: 'addNewComment',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { actions: addNewCommentActions, reducer: addNewCommentReducer } =
  addNewCommentSlice;
