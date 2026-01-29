import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="fr" suppressHydrationWarning>
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-TB2N39MVZM" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-TB2N39MVZM');`,
        }}
      />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
