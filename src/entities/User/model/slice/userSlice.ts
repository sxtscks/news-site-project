import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from 'entities/User/model/types/userSchema';

const initialState: UserSchema = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const { actions: userActions, reducer: userReducer } = userSlice;
