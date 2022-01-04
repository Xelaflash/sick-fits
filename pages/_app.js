import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import { AnimatePresence } from 'framer-motion';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import { CartStateProvider } from '../lib/cartState';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo, router }) {
  const url = `https://localhost:7777${router.route}`;
  // console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} canonical={url} key={url} />
          </AnimatePresence>
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
