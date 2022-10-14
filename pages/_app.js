import App, {Container} from 'next/app'
import Head from 'next/head'
import React from 'react'
import './index.css'

export default class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <title>Contoso: Band Name Generator</title>
        </Head>
        <Component {...pageProps} />
      </div>
    );
  }
}