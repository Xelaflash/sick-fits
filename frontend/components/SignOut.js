import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import { CURRENT_USER_QUERY } from './User';

const SIGNOUT_MUTATION = gql`
  mutation {
    # given by keystone backend
    endSession
  }
`;

export default function SignOut() {
  // const history = useHistory();
  // console.log(history);

  const routeChange = () => {
    // TODO: find a way to redictect after logout
    // const path = `/`;
    // history.push(path);
  };

  const [signout] = useMutation(SIGNOUT_MUTATION, {
    // refetch the current user for re-rendering
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <>
      <button type="button" onClick={(signout, routeChange)}>
        Log Out
      </button>
    </>
  );
}
