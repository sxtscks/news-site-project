import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/Text/Text';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import { updateProfileData } from '../../model/service/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEdit = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <HStack max justify="between" className={classnames('', {}, [className])}>
        <Text title={t('Профиль')} />
        {canEdit && (
          <div>
            {readonly ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                data-testId="EditableProfileCardHeader.EditButton"
              >
                {t('Редактировать')}
              </Button>
            ) : (
              <HStack gap="8">
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEdit}
                  data-testId="EditableProfileCardHeader.CancelButton"
                >
                  {t('Отменить')}
                </Button>
                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={onSave}
                  data-testId="EditableProfileCardHeader.SaveButton"
                >
                  {t('Сохранить')}
                </Button>
              </HStack>
            )}
          </div>
        )}
      </HStack>
    );
  }
);
