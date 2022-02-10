import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import SingleProduct, { SINGLE_ITEM_QUERY } from '../components/SingleProduct';
import { fakeItem } from '../lib/testUtils';

// Generating fake data
const product = fakeItem();
const mockData = [
  {
    // when tests is requesting this query and variable combo
    request: {
      query: SINGLE_ITEM_QUERY,
      variables: {
        id: '123',
      },
    },
    // return this mock data
    result: {
      data: {
        Product: product,
      },
    },
  },
];

describe('<SingleProduct/>', () => {
  it('1. Renders with proper data', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mockData}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    // In order to have the query and not the loading state we need to add a testId to our component and await for this to show up
    await screen.findByTestId('singleProduct');
    // debug();
    expect(container).toMatchSnapshot();
  });

  it('2. Renders an error when an item is not found', async () => {
    const errorMock = [
      {
        request: {
          query: SINGLE_ITEM_QUERY,
          variables: {
            id: '123',
          },
        },
        result: {
          errors: [{ message: 'Item not found' }],
        },
      },
    ];
    const { container, debug } = render(
      <MockedProvider mocks={errorMock}>
        <SingleProduct id="123" />
      </MockedProvider>
    );
    await screen.findByTestId('graphql-error');
    // debug();
    expect(container).toHaveTextContent('Item not found');
  });
});
