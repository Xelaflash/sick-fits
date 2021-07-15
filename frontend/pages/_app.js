import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Component } from 'react';
import '../components/styles/nprogress.css';
import { AnimatePresence } from 'framer-motion';
import { CartStateProvider } from '../lib/cartState';
import withData from '../lib/withData';
import Page from '../components/Page';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo, router }) {
  const url = `https://localhost:7777${router.route}`;
  // console.log(url);
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

MyApp.getInitialProps = async function ({ component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
