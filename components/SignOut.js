import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/router';

import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    # given by keystone backend
    endSession
  }
`;

export default function SignOut() {
  const router = useRouter();
  function redirect() {
    router.push('/');
  }

  const [signout] = useMutation(SIGNOUT_MUTATION, {
    // refetch the current user for re-rendering
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <>
      <button
        type="button"
        onClick={() => {
          signout();
          redirect();
        }}
      >
        Log Out
      </button>
    </>
  );
}
