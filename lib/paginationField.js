import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will handle this
    read(existing = [], { args, cache }) {
      // console.log(existing, args, cache);
      const { skip, first } = args;

      // read the nbr of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // console.log(data);
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      //  check if existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if we have items AND there aren't enough to fulfill our Perpage Items and we are on last page, just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don"'t have any item, we must go to the network
        return false;
      }

      // if there are items, just return them from the cache
      if (items.length) {
        return items;
      }
      return false; // fallback to networtk in case neither ifs are working

      // when appollo is looking fro products first thing is asks the read function for those items
      // we can either:
      // 1. return the item 'cause they are already in cache
      // 2. return false from here that will trigger a network request.
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the apollo client comes back from network with products.
      console.log('merging item from network');
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i += 1) {
        merged[i] = incoming[i - skip];
      }
      return merged;
    },
  };
}
