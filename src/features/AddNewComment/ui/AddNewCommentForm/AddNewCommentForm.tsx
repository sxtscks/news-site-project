import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { Input } from '@/shared/ui/Input/Input';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import {
  DynamicModuleLoader,
  ReducerList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack/HStack/HStack';
import {
  addNewCommentActions,
  addNewCommentReducer,
} from '../../model/slices/addNewCommentSlice';
import classes from './AddNewCommentForm.module.scss';
import {
  getCommentError,
  getCommentText,
} from '../../model/selectors/addNewCommentSelectors';

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
      <HStack
        justify="between"
        max
        className={classnames(classes.AddNewCommentForm, {}, [className])}
      >
        <Input
          className={classes.input}
          placeholder={t('Введите текст комментария')}
          value={text}
          onChange={onTextChange}
        />
        <Button theme={ButtonTheme.OUTLINE} onClick={onSendHandler}>
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
});

export default AddNewCommentForm;
