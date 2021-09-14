export default function calcTotalCartPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // product can be deleted but still in your cart.
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}
