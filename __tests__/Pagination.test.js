import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Pagination from '../components/Pagination';
import { makePaginationMocksFor } from '../lib/testUtils';

describe('<Pagination />', () => {
  it('1. Displays a loading message', () => {
    const { container } = render(
      <MockedProvider mocks={makePaginationMocksFor(1)}>
        <Pagination />
      </MockedProvider>
    );
    expect(container).toHaveTextContent('Loading...');
  });
  it('2. Renders pagination for 18 items', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(18)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // debug();
    expect(container).toHaveTextContent('Page 1 of 5');
    expect(container).toMatchSnapshot();
  });
  it('3. Disable prev page on page 1', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(12)}>
        <Pagination page={1} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // we use regex
    const prevBtn = screen.getByText(/Prev/);
    const nextBtn = screen.getByText(/Next/);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'true');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });
  it('4. Disable next page on last page (3)', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(16)}>
        <Pagination page={4} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // we use regex
    const prevBtn = screen.getByText(/Prev/);
    const nextBtn = screen.getByText(/Next/);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'true');
  });
  it('5. Enables all on middle pages', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={makePaginationMocksFor(20)}>
        <Pagination page={2} />
      </MockedProvider>
    );
    await screen.findByTestId('pagination');
    // we use regex
    const prevBtn = screen.getByText(/Prev/);
    const nextBtn = screen.getByText(/Next/);
    expect(prevBtn).toHaveAttribute('aria-disabled', 'false');
    expect(nextBtn).toHaveAttribute('aria-disabled', 'false');
  });
});
