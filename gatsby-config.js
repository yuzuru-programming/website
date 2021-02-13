const env = process.env.NODE_ENV || 'development';

require('dotenv').config({ path: `./.env.${env}` });

module.exports = {
  // エラーを消す
  // https://stackoverflow.com/questions/46865880/react-16-warning-expected-server-html-to-contain-a-matching-div-in-div-due
  flags: {
    DEV_SSR: false,
  },

  // サイトメタデータ
  siteMetadata: {
    siteUrl: `https://itsumen.com`,
  },

  // プラグイン
  plugins: [
    // サイトマップ
    `gatsby-plugin-sitemap`,

    // アナリティクス
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: env !== 'development' ? process.env.GOOGLEANALYTICS : 'dev',
      },
    },

    // アドセンス
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: env !== 'development' ? process.env.ADSBYGOOGLE : 'dev',
      },
    },

    // headタグにcssやら埋め込む
    `gatsby-plugin-react-helmet`,

    // sassを使えるようにする
    'gatsby-plugin-sass',

    // graphqlの型自動生成
    `gatsby-plugin-typegen`,

    // markdownをhtmlに変換
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // 記事目次関係のプログイン
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: 'Table of Contents',
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: 'table-of-contents',
            },
          },

          // 記事目次関係のプログイン
          `gatsby-remark-autolink-headers`,

          // ソースコードをコピー
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              tooltipText: `Copy to clipboard`,
              toasterText: 'Copied to clipboard',
              toasterDuration: 5000,
            },
          },

          // ソースコードのタイトル
          'gatsby-remark-prismjs-title',

          // シンタックスハイライト
          `gatsby-remark-prismjs`,
        ],
      },
    },

    // 記事
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './src/posts',
      },
    },
    // クライアントサイドのルーティング
    // {
    //   resolve: `gatsby-plugin-create-client-paths`,
    //   options: { prefixes: [`/sites/*`] },
    // },
  ],
};
