import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/userSchema';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { LOCAL_STORAGE_FALLBACK_THEME_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_FALLBACK_THEME_KEY,
        response.features?.isAppRedesigned ? 'new' : 'old'
      );

      return response;
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  }
);
