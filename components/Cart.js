import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalCartPrice from '../lib/calcTotalCartPrice';
import { useCart } from '../lib/cartState';
import CloseButton from './styles/CloseButton';
import { Checkout } from './Checkout';

export default function Cart() {
  const currentUser = useUser();
  const { cartOpen, closeCart } = useCart();
  // console.log(cartOpen);
  if (!currentUser) return null;
  // console.log(currentUser);
  return (
    <CartStyles open={cartOpen}>
      <CloseButton type="button" onClick={closeCart} id="close-cart">
        &times;
      </CloseButton>
      <header>
        <Supreme>{currentUser.name}</Supreme>
      </header>
      <ul>
        {currentUser.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalCartPrice(currentUser.cart))}</p>
        <Checkout />
      </footer>
    </CartStyles>
  );
}
