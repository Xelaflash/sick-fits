import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange } = useForm({
    email: '',
    password: '',
    token,
  });

  const [reset, { data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const sucessfullError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  // console.log(error);

  async function handleSubmit(e) {
    e.preventDefault();
    // send email and password to graphQl API
    await reset().catch(console.error);
    // console.log(res);
    // console.log({ data, loading, error });
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset your Password</h2>
      <DisplayError error={error || sucessfullError} />
      <fieldset className="inputs-subgrid">
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Password reseted. Please SignIn</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="x@x.com"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
