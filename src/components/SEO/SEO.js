// Next
import Head from 'next/head';

export function SEO({ pageTitle }) {
  // Page Title
  const message = `${pageTitle}`;

  return (
    <Head>
      <title>{message}</title>

      <meta name="title" content={message} />
      <meta name="description" content={`${pageTitle}`} />

      <meta
        name="viewport"
        content="width=device-width, minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <link rel="icon" href="/logo/logo_short.png" />
    </Head>
  );
}
