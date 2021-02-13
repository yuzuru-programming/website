import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Head from '../components/head';
import Header from '../components/header';
import Aside from '../components/aside';

import { Constant } from '../constant';

export default ({
  data,
  location,
}: {
  data: GatsbyTypes.SingleTemplateQuery;
  location: { pathname: string };
}) => {
  React.useEffect(() => {
    try {
      if (process.env.NODE_ENV !== 'production') {
        return;
      }

      if (window) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (error) {}
  });

  return (
    <>
      <Head />
      <Helmet>
        <link rel="stylesheet" href="/css/single.css" />

        <title>{`${data.markdownRemark?.frontmatter?.title} | ${Constant.title}`}</title>
        <meta
          name="description"
          content={data.markdownRemark?.frontmatter?.description}
        />

        <meta
          property="og:url"
          content={`${Constant.url}${location.pathname}`}
        />
        <meta
          property="og:title"
          content={`${data.markdownRemark?.frontmatter?.title} | ${Constant.title}`}
        />
        <meta property="og:image" content={`${Constant.url}/uploads/ogp.png`} />
        <meta
          property="og:description"
          content={data.markdownRemark?.frontmatter?.description}
        />
      </Helmet>

      <Header page={'single'} />

      {/* アドセンス */}
      {process.env.NODE_ENV === 'production' && (
        <div className="text-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={process.env.ADSBYGOOGLE}
            data-ad-slot={process.env.ADSBYGOOGLESLOTID}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}

      {/* パンくずリスト */}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">ホーム</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          記事
        </li>
      </ol>
      <hr />

      <main>
        <div className="container">
          <div className="row">
            <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
              <section>
                <div style={{ background: '#fff', padding: '0 10px' }}>
                  {/* 更新日 */}
                  <div
                    className="text-right"
                    style={{ color: '#999', fontSize: 15, marginRight: 16 }}
                  >
                    更新日:
                    <time>{data.markdownRemark?.frontmatter?.lastmod}</time>
                  </div>

                  {/* タイトル */}
                  <h1>{data.markdownRemark?.frontmatter?.title}</h1>

                  {/* タグ */}
                  <div className="_tagWrapper">
                    {data.markdownRemark?.frontmatter?.tags?.map((tag, j) => {
                      return (
                        <div className="_tag" key={j}>
                          <Link
                            to={`/tags/${tag}`}
                            style={{ textDecoration: 'none' }}
                          >
                            {tag}
                          </Link>
                        </div>
                      );
                    })}
                  </div>

                  {/* 目次 */}
                  <div
                    className="table-of-content"
                    dangerouslySetInnerHTML={{
                      __html: data.markdownRemark?.tableOfContents ?? '',
                    }}
                  />

                  {/* 記事 */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.markdownRemark?.html ?? '',
                    }}
                  />
                </div>

                <hr />
              </section>
            </article>
            <aside className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
              <Aside />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query SingleTemplate($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD", locale: "ja-JP")
        lastmod(formatString: "YYYY-MM-DD", locale: "ja-JP")
        description
        tags
        archives
      }
      tableOfContents(pathToSlugField: "frontmatter.slug")
    }
  }
`;
