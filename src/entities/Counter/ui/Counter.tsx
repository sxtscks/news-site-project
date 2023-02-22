import React from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getCounterValue,
} from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';

export const Counter = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const counterValue = useSelector(getCounterValue);
  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div data-testid="counter">
      <h1 data-testid="counter-value">
        {counterValue}
      </h1>
      <Button
        data-testid="increment-button"
        onClick={increment}
      >
        {t('increment')}
      </Button>
      <Button
        data-testid="decrement-button"
        onClick={decrement}
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
