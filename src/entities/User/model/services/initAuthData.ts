import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/userSchema';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (newJsonSettings, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      return await dispatch(getUserDataByIdQuery(userId)).unwrap();
    } catch (e) {
      console.log(e);
      return rejectWithValue('');
    }
  }
);
