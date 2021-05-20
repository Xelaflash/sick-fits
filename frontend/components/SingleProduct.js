import { gql, useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  /* min-height: 800px; */
  max-width: --var(maxWidth);
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    /* height: 100%; */
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  // console.log({ data, loading, error });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const product = data.Product;
  return (
    <ProductStyles>
      {/* next has a pkg similar to helmet just add Head component anywhere and pass SEO title */}
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      <img src={product.photo.image.publicUrlTransformed} alt={product.name} />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}

SingleProduct.propTypes = {
  id: PropTypes.any,
};
