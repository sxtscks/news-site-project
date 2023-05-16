import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('button', () => {
  test('render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('with theme', () => {
    render(<Button variant="clear">TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
  });
});
