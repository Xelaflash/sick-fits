// At it's simplest Access control function returns a bool value depending on the users session

import { ListAccessArgs } from './types';

export function isSignedIn({ session }: ListAccessArgs) {
  // !! coerce as bool. if session is undefined it will return false
  return !!session;
}
