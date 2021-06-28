import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import CartItem from './CartItem';
import formatMoney from '../lib/formatMoney';
import calcTotalCartPrice from '../lib/calcTotalCartPrice';

export default function Cart() {
  const currentUser = useUser();
  if (!currentUser) return null;
  console.log(currentUser);
  return (
    <CartStyles open>
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
      </footer>
    </CartStyles>
  );
}
