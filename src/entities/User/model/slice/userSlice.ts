import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { User, UserSchema } from '../types/userSchema';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';
import { LOCAL_STORAGE_FALLBACK_THEME_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';

const initialState: UserSchema = {
  mounted: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      setFeatureFlags(payload.features);
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, payload.id);
      localStorage.setItem(
        LOCAL_STORAGE_FALLBACK_THEME_KEY,
        payload.features?.isAppRedesigned ? 'new' : 'old'
      );
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      }
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;
        setFeatureFlags(payload.features);
        state.mounted = true;
      }
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state.mounted = true;
    });
  },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
