import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      status
      photo {
        id
        image {
          publicUrlTransformed
        }
        altText
      }
    }
  }
`;

export default function Products() {
  useQuery(ALL_PRODUCTS_QUERY);
  return (
    <div>
      <p>Products</p>
    </div>
  );
}
