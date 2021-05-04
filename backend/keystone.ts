import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/sick-fits';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay signed in (session cookie)
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: Add initial roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
      // TODO: add seed
    },
    // Keystone refers to data type as 'lists'
    lists: createSchema({
      // schema items go in here
      User,
    }),
    ui: {
      // show UI only for user who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        // the bangs permits to coerce as a bool
        !!session?.data,
    },
    // TODO: Add value session here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
