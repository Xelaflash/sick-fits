// create a delete button (emoji trash)
// create delete mutation DELETE_CART_ITEM (built in keystone API)
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  margin: 1rem;
  font-size: 2rem;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  // console.log(payload);
  // console.log('running refreshFrontENd function after a delete');
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  //  the delete mutation
  const [deleteCartItem, { loading }] = useMutation(DELETE_CART_ITEM_MUTATION, {
    variables: { id },
    update,
  });
  return (
    <RemoveBtn
      type="button"
      disabled={loading}
      onClick={deleteCartItem}
      title="Remove item from Cart"
    >
      <FaTrashAlt />
    </RemoveBtn>
  );
}
