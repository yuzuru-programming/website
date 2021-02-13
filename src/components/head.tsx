import React from 'react';
import { Helmet } from 'react-helmet';

import { Constant } from '../constant';

export default () => {
  return (
    <>
      <Helmet>
        <html lang="ja" />

        {/* favicon */}
        <link rel="shortcut icon" href="/uploads/favicon.ico" />
        <link rel="apple-touch-icon" href="/uploads/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          href="/uploads/android-chrome-256x256.png"
        />
        {/* OGP */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={Constant.title} />

        {/* Bootstrap5 */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        ></link>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
    </>
  );
};
