import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product />', () => {
  it('1. Renders out the price tag & title', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const priceTag = screen.getByText('$50');
    // debug(priceTag);
    expect(priceTag).toBeInTheDocument();
    // to see what's actually rendered
    // debug();
    const link = container.querySelector('a');
    // debug(link);
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });

  it('2. render and matches the snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('3. It renders the img correctly', () => {
    const { container } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // we grab the image by the AltText
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
