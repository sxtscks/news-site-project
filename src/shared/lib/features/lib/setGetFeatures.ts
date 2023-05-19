import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_FALLBACK_THEME_KEY } from '@/app/providers/ThemeProvider/lib/ThemeContext';

let featureFlags: FeatureFlags = {
  isAppRedesigned:
    localStorage.getItem(LOCAL_STORAGE_FALLBACK_THEME_KEY) === 'new',
};

export const setFeatureFlags = (newFeatureFlags?: FeatureFlags) => {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags;
  }
};

export const getFeatureFlag = (flag: keyof FeatureFlags) => featureFlags[flag];

export const getAllFeatureFlags = () => featureFlags;
