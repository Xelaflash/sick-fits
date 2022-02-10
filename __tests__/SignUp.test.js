import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser } from '../lib/testUtils';

const user = fakeUser();

const mocks = [
  // mutation mock
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: user.name,
        email: user.email,
        password: 'pwd',
      },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'idofuser',
          name: user.name,
          email: user.email,
        },
      },
    },
  },
  // current user mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { authenticatedItem: user } },
  },
];

describe('<SignUp />', () => {
  it('1. renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('2. Call mutation properly ', async () => {
    const { debug } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    // type into input fields
    await userEvent.type(screen.getByPlaceholderText('John Doe'), user.name);
    await userEvent.type(screen.getByPlaceholderText('x@x.com'), user.email);
    await userEvent.type(screen.getByPlaceholderText('Password'), 'pwd');
    // submit event
    await userEvent.click(screen.getByText('Create Account'));
    await screen.findByText(`Sign Up with ${user.email} - Please Sign In`);
    // debug();
  });
});
