import React from 'react';
import { navigate, Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import Head from '../../../components/head';
import { Loading } from '../../../components/loading';
import Header from '../../../components/header';
import Aside from '../../../components/aside';

import copy from 'copy-to-clipboard';
import Querystring from 'query-string';

import firebase from '../../../firebase/code';
import { Constant } from '../../../constant';

export default ({
  location,
}: {
  location: { href: string; pathname: string; search: string };
}) => {
  const [loading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState(
    {} as { title: string; code: string; genreId: number }
  );

  React.useEffect(() => {
    const _query = Querystring.parse(location.search).q as string;
    if (_query === undefined) {
      navigate('/app/code');
      return;
    }

    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        firebase
          .auth()
          .signInAnonymously()
          .then(() => '');
        return;
      }

      // get
      const _ret = await firebase
        .firestore()
        .collection('boards')
        .doc(_query)
        .get();

      if (!_ret.exists) {
        navigate('/app/code');
        return;
      }

      const _data = _ret.data() as {
        title: string;
        code: string;
        genreId: number;
      };

      setInfo({ title: _data.title, code: _data.code, genreId: _data.genreId });
      setLoading(false);
    });

    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  const CustomHead = () => {
    return (
      <>
        <Head />
        <Helmet>
          <link rel="stylesheet" href="/css/single.css" />

          <title>{`ログインなしでソースコードを投稿・共有できるページです。 | ${Constant.title}`}</title>
          <meta
            name="description"
            content={`ログインなしでソースコードを投稿・共有できるページです。 | ${Constant.title}`}
          />

          <meta
            property="og:url"
            content={`${Constant.url}${location.pathname}`}
          />
          <meta
            property="og:title"
            content={`ログインなしでソースコードを投稿・共有できるページです。 | ${Constant.title}`}
          />
          <meta
            property="og:image"
            content={`${Constant.url}/uploads/ogp.png`}
          />
          <meta
            property="og:description"
            content={`ログインなしでソースコードを投稿・共有できるページです。 | ${Constant.title}`}
          />
        </Helmet>
      </>
    );
  };

  if (loading) {
    return (
      <>
        <CustomHead />
        <Helmet>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          ></link>
        </Helmet>
        <Loading />
      </>
    );
  }

  return (
    <>
      <CustomHead />

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

      <hr />
      {/* パンくずリスト */}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">ホーム</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          <Link to="/app/code">コード投稿ページ</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          投稿されたコード
        </li>
      </ol>
      <hr />

      <main>
        <div className="container">
          <div className="row">
            <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
              <section>
                <div className="gatsby-code-title">
                  <span>{info.title}</span>
                </div>
                <div
                  className="gatsby-highlight"
                  data-language={Constant.code.lang[info.genreId]}
                >
                  <pre
                    className={`language-${Constant.code.lang[info.genreId]}`}
                  >
                    <code
                      className={`language-${Constant.code.lang[info.genreId]}`}
                    >
                      {info.code}
                    </code>
                  </pre>
                </div>

                <div>
                  {/* URLのQRコード */}
                  <div className="form-group" style={{ textAlign: 'center' }}>
                    <div style={{ margin: 'auto' }}>
                      <img
                        src={`https://chart.apis.google.com/chart?cht=qr&chs=${100}x${100}&chl=${encodeURI(
                          location.href
                        )}`}
                        style={{
                          width: 100,
                          height: 100,
                          border: 'solid 1px gray',
                        }}
                      ></img>
                    </div>
                  </div>

                  <br />

                  {/* ボタン左 */}
                  <div id="button_area" style={{ textAlign: 'center' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        copy(location.href);
                        alert('URLをコピーしました');
                      }}
                    >
                      URLコピー
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* ボタン右 */}
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => {
                        copy(info.code);
                        alert('ソースをコピーしました');
                      }}
                    >
                      ソースコピー
                    </button>
                  </div>
                </div>
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
