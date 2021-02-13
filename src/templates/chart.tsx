import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';

import Head from '../components/head';
import Header from '../components/header';
import Aside from '../components/aside';

import { Constant } from '../constant';

export default (params: {
  children: JSX.Element;
  titie: string;
  description: string;
  url: string;
  image_path: string | null;
  breadcrumb: string[];
}) => {
  return (
    <>
      <Head />

      <Helmet>
        <title>
          {params.titie.length === 0
            ? Constant.title
            : `${params.titie} | ${Constant.title}`}
        </title>
        <meta name="description" content={params.description} />

        <meta property="og:url" content={params.url} />
        <meta
          property="og:title"
          content={
            params.titie.length === 0
              ? Constant.title
              : `${params.titie} | ${Constant.title}`
          }
        />
        {params.image_path == null ? (
          <meta
            property="og:image"
            content={`${Constant.url}/uploads/ogp.png`}
          />
        ) : (
          <meta property="og:image" content={params.image_path} />
        )}

        <meta property="og:description" content={params.description} />
      </Helmet>

      <Header page={params.breadcrumb.length === 0 ? 'info' : 'other'} />

      {params.breadcrumb.length !== 0 ? (
        <>
          <hr />
          {/* パンくずリスト */}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">ホーム</Link>
            </li>

            {params.breadcrumb.map((m, i) => {
              return (
                <li key={i} className="breadcrumb-item active">
                  {m}
                </li>
              );
            })}
          </ol>
          <hr />
        </>
      ) : (
        <>
          <hr />
          {/* パンくずリスト */}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">ホーム</Link>
            </li>
            <li className="breadcrumb-item active">投稿記事一覧</li>
          </ol>
          <hr />
        </>
      )}

      <main>
        <div className="container">
          <div className="row">
            <article className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
              <section>{params.children}</section>
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
