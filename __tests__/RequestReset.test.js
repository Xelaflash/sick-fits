import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import userEvent from '@testing-library/user-event';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'rien@rien.com';

const mock = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset />', () => {
  it('1. renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('2. Calls mutation when submitted', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mock}>
        <RequestReset />
      </MockedProvider>
    );
    // we type into user input field
    userEvent.type(screen.getByPlaceholderText(/x@x.com/), email);
    userEvent.click(screen.getByText('Reset'));
    debug();
    const success = await screen.findByText(
      /Reset Link sent. Check your email/i
    );
    // screen.debug(success);
    expect(success).toBeInTheDocument();
  });
});
