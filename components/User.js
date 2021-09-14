// here we will have a big query to get the current user.
// In order to reuse if needed we will create a custom Hook that returns the current user.

import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
  query {
    # authenticatedItem return a "union" (a type) so need to do the specific syntax in graphql ... on User ==> means give me the datas when authetificatedItem return a User unions.
    authenticatedItem {
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
