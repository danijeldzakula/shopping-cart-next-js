import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    const initialProps = await Document.getInitialProps(ctx);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} />,
      });

    return {
      ...initialProps,
      style: [...React.Children.toArray(initialProps.styles)],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
