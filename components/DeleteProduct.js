import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

// payload is whats gets returned from the mutation
function update(cache, payload) {
  console.log(payload);
  console.log('running refreshFrontENd function after a delete');
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  //  the delete mutation
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to DELETE this item?')) {
          // go ahead and actually delete the product
          console.log('deleting');
          deleteProduct().catch((err) => alert(err));
        }
      }}
    >
      {children}
    </button>
  );
}
