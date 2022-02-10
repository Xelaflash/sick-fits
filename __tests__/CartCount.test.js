import { render, waitFor } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount/>', () => {
  it('1. Renders', () => {
    render(<CartCount count={10} />);
  });
  it('2. matches snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('3. updates via props', async () => {
    const { container, rerender, debug } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    // exactly the same
    // expect(container).toHaveTextContent('11');
    // ! Update the props
    rerender(<CartCount count={12} />);
    // we need to wait for cart count animation to finish, because for a short moment it will have old & new value causing test to fail
    // await wait(600);
    await waitFor(() => {
      expect(container.textContent).toBe('12');
    });
    expect(container).toMatchSnapshot();
    // debug();
  });
});
