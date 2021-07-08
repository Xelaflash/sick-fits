import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  // make sure they are signed in
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('Please Sign in to checkout');
  }
  //  Query the user cart and associated products
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: `
    id
      name
      email
      cart {
        id
        quantity
        product {
          id
          name
          price
          description
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
      `,
  });
  // console.dir(user, { depth: null });
  //  calculate total price
  // below line filter product that are in cart but not anymore existing in DB. if cartItem.product return Null they will be filtered out.
  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);
  // console.log(totalPrice);
  // create charge with stripe library
  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(charge);

  // convert cartItems to OrderItems
  // create the order and return it
}

export default checkout;
