import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema } from '../types/authSchema';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

const initialState: AuthSchema = {
  username: '',
  password: '',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
