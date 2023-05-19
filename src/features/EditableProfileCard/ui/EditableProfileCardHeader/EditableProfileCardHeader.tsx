import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import { updateProfileData } from '../../model/service/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { ToggleFeatures } from '@/shared/lib/features';

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
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <HStack
            max
            justify="between"
            className={classnames('', {}, [className])}
          >
            <Text title={t('Профиль')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <Button
                    onClick={onEdit}
                    data-testId="EditableProfileCardHeader.EditButton"
                  >
                    {t('Редактировать')}
                  </Button>
                ) : (
                  <HStack gap="8">
                    <Button
                      onClick={onCancelEdit}
                      data-testId="EditableProfileCardHeader.CancelButton"
                    >
                      {t('Отменить')}
                    </Button>
                    <Button
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
        }
        off={
          <HStack
            max
            justify="between"
            className={classnames('', {}, [className])}
          >
            <TextDeprecated title={t('Профиль')} />
            {canEdit && (
              <div>
                {readonly ? (
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEdit}
                    data-testId="EditableProfileCardHeader.EditButton"
                  >
                    {t('Редактировать')}
                  </ButtonDeprecated>
                ) : (
                  <HStack gap="8">
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEdit}
                      data-testId="EditableProfileCardHeader.CancelButton"
                    >
                      {t('Отменить')}
                    </ButtonDeprecated>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSave}
                      data-testId="EditableProfileCardHeader.SaveButton"
                    >
                      {t('Сохранить')}
                    </ButtonDeprecated>
                  </HStack>
                )}
              </div>
            )}
          </HStack>
        }
      />
    );
  }
);
