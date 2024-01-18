import React, { Fragment, useState } from "react";
import Head from "next/head";
import { Router } from "next/router";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";
import store from "@/store/store";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import "@/styles/globals.css";

let persistor = persistStore(store);

function MyApp(props) {
  const { Component, pageProps } = props;

  const [isLoading, setIsLoading] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useIsomorphicLayoutEffect(() => {
    const start = () => {
      setIsLoading((prevState) => {
        return {
          ...prevState,
          isRouteChanging: true,
          loadingKey: prevState.loadingKey ^ 1,
        };
      });
    };

    const end = () => {
      setIsLoading((prevState) => {
        return {
          ...prevState,
          isRouteChanging: false,
        };
      });
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <Fragment>
      <Head />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NextNProgress
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps };
};

export default MyApp;
