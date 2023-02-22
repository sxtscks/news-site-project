import { fireEvent, screen } from '@testing-library/react';
import {
  componentRender,
} from 'shared/lib/tests/componentRender/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('render', () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });
    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('10');
  });

  test('increment counter', () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });
    const incrementButton = screen.getByTestId('increment-button');
    const counterValue = screen.getByTestId('counter-value');
    fireEvent.click(incrementButton);
    expect(counterValue).toHaveTextContent('11');
  });

  test('decrement counter', () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });
    const decrementButton = screen.getByTestId('decrement-button');
    const counterValue = screen.getByTestId('counter-value');
    fireEvent.click(decrementButton);
    expect(counterValue).toHaveTextContent('9');
  });
});
