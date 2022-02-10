import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    // send email and password to graphQl API
    const res = await signup().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Create an Account</h2>
      <DisplayError error={error} />
      <fieldset
        className="inputs-subgrid"
        disabled={loading}
        aria-busy={loading}
      >
        {data?.createUser && (
          <p>Sign Up with {data.createUser.email} - Please Sign In </p>
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
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            value={inputs.name}
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
        <button type="submit">Create Account</button>
      </fieldset>
    </Form>
  );
}

export { SIGNUP_MUTATION };
