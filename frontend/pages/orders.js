import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderItemsStyles from '../components/styles/OrderItemStyles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
  li:hover > * {
    text-decoration: none;
  }
`;

function countItemInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  // console.log(allOrders);
  return (
    <>
      <Head>
        <title>Sick Kicks - Your Orders ({allOrders.length})</title>
      </Head>
      <div>
        <h2>You have {allOrders.length} orders</h2>
      </div>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemsStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div>
                  <p style={{ textAlign: 'center' }}>Order: {order.id}</p>
                  <div className="order-meta">
                    <p>
                      {order.items.length}{' '}
                      {order.items.length > 1 ? 'products' : 'product'}
                    </p>
                    <p>
                      {countItemInOrder(order)} item
                      {countItemInOrder(order) === 1 ? '' : 's'}
                    </p>
                    <p>{formatMoney(order.total)}</p>
                  </div>
                  <div className="images">
                    {order.items.map((item) => (
                      <img
                        key={item.id}
                        src={item.photo?.image?.publicUrlTransformed}
                        alt={item.name}
                      />
                    ))}
                  </div>
                </div>
              </a>
            </Link>
          </OrderItemsStyles>
        ))}
      </OrderUl>
    </>
  );
}
