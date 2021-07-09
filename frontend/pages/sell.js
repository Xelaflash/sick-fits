import CreateProduct from '../components/CreateProduct';
import Head from 'next/head';

export default function SellPage() {
  return (
  <>
    <Head>
      <title>
        Sick Kicks - Sell your kicks
      </title>
    </Head>
    <div>
      <CreateProduct />
    </div>
  </>
  );
}
