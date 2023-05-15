import { ReactElement } from 'react';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement | null;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { off, on, feature } = props;

  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
};
