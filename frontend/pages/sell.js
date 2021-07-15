import Head from 'next/head';
import CreateProduct from '../components/CreateProduct';
import Layout from '../components/Layout';
import PleaseSignIn from '../components/PleaseSignIn';

export default function SellPage() {
  return (
    <>
      <Head>
        <title>Sick Kicks - Sell your kicks</title>
      </Head>
      <div>
        <Layout>
          <PleaseSignIn>
            <CreateProduct />
          </PleaseSignIn>
        </Layout>
      </div>
    </>
  );
}
