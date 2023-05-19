import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack/HStack/HStack';
import {
  addNewCommentActions,
  addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import classes from './AddNewCommentForm.module.scss';
import {
  getCommentError,
  getCommentText,
} from '../../model/selectors/addNewCommentSelectors';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddNewCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducerList = {
  addNewComment: addNewCommentReducer,
};

const AddNewCommentForm = memo((props: AddNewCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getCommentText);
  const error = useSelector(getCommentError);

  const onTextChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value));
    },
    [dispatch]
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text);
    onTextChange('');
  }, [onTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="round" fullWidth>
            <HStack
              justify="between"
              max
              gap="16"
              className={classnames(classes.AddNewCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                className={classes.input}
                placeholder={t('Введите текст комментария')}
                value={text}
                onChange={onTextChange}
              />
              <Button onClick={onSendHandler}>{t('Отправить')}</Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            justify="between"
            max
            className={classnames(classes.AddNewCommentForm, {}, [className])}
          >
            <InputDeprecated
              className={classes.input}
              placeholder={t('Введите текст комментария')}
              value={text}
              onChange={onTextChange}
            />
            <ButtonDeprecated
              theme={ButtonTheme.OUTLINE}
              onClick={onSendHandler}
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddNewCommentForm;
