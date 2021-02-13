import React from 'react';
import { Link } from 'gatsby';
import { Constant } from '../constant';

export default (params: { page: string }) => {
  return (
    <>
      <header>
        <nav className="navbar navbar-light">
          {params.page === 'info' ? (
            <h1 style={{ fontSize: 18 }}>
              <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                {Constant.title}
              </Link>
            </h1>
          ) : (
            <div style={{ fontSize: 18 }}>
              <Link to="/" style={{ color: 'black', textDecoration: 'none' }}>
                {Constant.title}
              </Link>
            </div>
          )}

          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarList"
            aria-controls="navbarList"
            aria-expanded="false"
            aria-label="ナビゲーションの切替"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div style={{ width: '95%', margin: '0 auto' }}>
            <div
              className="collapse navbar-collapse"
              id="navbarList"
              style={{ zIndex: 2 }}
            >
              <ul className="nav navbar-nav mx-auto">
                <li className="list-group-item">
                  <Link to="/contact">お問い合わせ</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/privacy">プライバシーポリシー</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/app/qrcode">QRコードを生成する</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/app/shortlink">短縮URLを生成する</Link>
                </li>
                <li className="list-group-item">
                  <Link to="/app/chat">リアルタイムチャット</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {params.page !== 'single' && (
        <>
          <div className="_background"></div>
        </>
      )}
    </>
  );
};
