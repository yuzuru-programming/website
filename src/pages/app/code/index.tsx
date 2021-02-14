import React from 'react';
import { navigate, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

import Head from '../../../components/head';
import { Loading } from '../../../components/loading';
import Header from '../../../components/header';
import Aside from '../../../components/aside';

import firebase from '../../../firebase/code';
import { Constant } from '../../../constant';

// const setLocalStorage = (params: {
//   title: string;
//   genreId: number;
//   query: string;
// }) => {
//   const _storage = localStorage.getItem('history') as string;
//   const _history = JSON.parse(_storage) === null ? [] : JSON.parse(_storage);

//   _history.unshift({
//     title: params.title,
//     genreId: Number(params.genreId),
//     query: params.query,
//     createdAt: new Date(),
//   });

//   _history.length > 3 ? _history.pop() : '';
//   localStorage.setItem('history', JSON.stringify(_history));
// };

export default ({
  location,
}: {
  location: { href: string; pathname: string };
}) => {
  const [loading, setLoading] = React.useState(false);

  const methods = useForm<{ title: string; code: string; genreId: number }>({
    mode: 'onChange',
    defaultValues: { title: 'タイトルなし', code: '', genreId: 0 },
  });

  const onSubmit = methods.handleSubmit(async data => {
    if (!window.confirm('投稿しますか?')) {
      return;
    }

    try {
      const _param = data;
      methods.reset();

      setLoading(true);
      // apiたたく
      const _ret = (await firebase
        .firestore()
        .collection('boards')
        .add({
          uid: await firebase.auth().currentUser?.uid,
          title: _param.title,
          code: _param.code,
          genreId: Number(_param.genreId),
          createdAt: new Date(),
          updatedAt: new Date(),
        })) as { id: string };

      // ローカルストレージに保存
      // setLocalStorage({
      //   title: _param.title,
      //   genreId: _param.genreId,
      //   query: _ret.id,
      // });

      // code.htmlへ
      navigate(`/app/code/code.html?q=${_ret.id}`);
    } catch (error) {}
  });

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(async data => {
      if (data === null) {
        firebase
          .auth()
          .signInAnonymously()
          .then(() => '');
        return;
      }
    });

    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (window) {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    }
  }, []);

  if (loading) {
    return (
      <>
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
        <meta property="og:image" content={`${Constant.url}/uploads/ogp.png`} />
        <meta
          property="og:description"
          content={`ログインなしでソースコードを投稿・共有できるページです。 | ${Constant.title}`}
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

      <hr />
      {/* パンくずリスト */}
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">ホーム</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          コード投稿ページ
        </li>
      </ol>
      <hr />

      <main>
        <div className="container">
          <div className="row">
            <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
              <section style={{ background: '#f7f7f7' }}>
                <form
                  onSubmit={onSubmit}
                  onKeyDown={e => e.key === 'Enter' && ''}
                >
                  {/* 言語 */}
                  <div className="form-group">
                    <label className="control-label col-xs-2">言語</label>
                    <div className="col-xs-3">
                      <select
                        className="form-control"
                        ref={methods.register({ required: true })}
                        name="genreId"
                      >
                        {Constant.code.lang.map((m, i) => (
                          <option value={i} key={i}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <br />
                  {/* タイトル */}
                  <div className="form-group">
                    <label>タイトル</label>
                    <input
                      name="title"
                      className="form-control"
                      placeholder="タイトルを入力(15文字以内)"
                      maxLength={15}
                      required
                      ref={methods.register({
                        required: '必須項目です',
                        maxLength: {
                          value: 15,
                          message: '15文字以内で入力してください',
                        },
                      })}
                    />
                  </div>
                  <br />
                  {/* ソースコード */}
                  <div className="form-group">
                    <label>ソースコード</label>
                    <textarea
                      name="code"
                      className="form-control"
                      rows={7}
                      placeholder="2500文字以内"
                      maxLength={2500}
                      required
                      ref={methods.register({
                        required: '必須項目です',
                        maxLength: {
                          value: 2500,
                          message: '2500文字以内で入力してください',
                        },
                      })}
                    ></textarea>
                  </div>
                  <br />
                  {/* 投稿ボタン */}
                  <input
                    type="submit"
                    value="投稿"
                    className="btn btn-primary"
                  />
                </form>
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
