import Head from 'next/head';
import CreateProduct from '../components/CreateProduct';
import PleaseSignIn from '../components/PleaseSignIn';

export default function SellPage() {
  return (
    <>
      <Head>
        <title>Sick Kicks - Sell your kicks</title>
      </Head>
      <div>
        <PleaseSignIn>
          <CreateProduct />
        </PleaseSignIn>
      </div>
    </>
  );
}
