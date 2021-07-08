import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import { useState } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle } from 'react-icons/fa';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
  font-size: 2rem;
  margin: auto;
`;

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  // we need our own pice of state to show user something is currently happening
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  // Hooks coming from stripe (https://stripe.com/docs/stripe-js/react)
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION
  );

  async function handleSubmit(e) {
    // stop the form from submitting and turn loader on
    e.preventDefault();
    setLoading(true);
    // start page transition
    nProgress.start();
    // create payment method via stripe (token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // handle stripe errors ()
    if (error) {
      setError(error);
      nProgress.done();
    }
    // send token from step 3 to keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(order);
    // change page to view the order
    // close cart
    // turn loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && (
        <div
          style={{
            fontSize: 14,
            color: 'red',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaExclamationTriangle />
          <p>{error.message}</p>
        </div>
      )}
      {graphQLError && (
        <div
          style={{
            fontSize: 14,
            color: 'red',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaExclamationTriangle />
          <p>{graphQLError.message}</p>
        </div>
      )}
      <CardElement />
      <SickButton>Pay Now</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
