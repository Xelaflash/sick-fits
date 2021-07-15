import { useRouter } from 'next/dist/client/router';
import Layout from '../../components/Layout';

import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  // need to parse as int because query.page is returning a string
  const page = parseInt(query.page);
  return (
    <Layout>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Layout>
  );
}
