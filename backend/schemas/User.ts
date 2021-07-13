import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
  // access:
  // ui:
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    //  TODO: add roles, cart and orders
    cart: relationship({
      ref: 'CartItem.user',
      // Allow to have multiple items in cart
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'read' },
      },
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      //  TODO: Add access control
    }),
    orders: relationship({ ref: 'Order.user', many: true }),
    products: relationship({ ref: 'Product.user', many: true }),
  },
});
