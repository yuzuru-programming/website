import * as React from 'react';
import { useRecoilState } from 'recoil';

import { useTwitter } from 'src/hooks';
import state from 'src/recoil';

const Header = () => {
  const [snsLogin] = useRecoilState(state.snsLogin);
  const [su] = useRecoilState(state.su);
  const { login, logout } = useTwitter();

  return React.useMemo(() => {
    return (
      <>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">ホーム</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            リアルタイムチャット
          </li>
        </ol>

        {snsLogin === false ? (
          <button
            type="button"
            className="btn btn-success"
            onClick={async () => login()}
          >
            ログイン
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => logout()}
          >
            ログアウト
          </button>
        )}

        <p>接続ユーザ数: {su}</p>
        <hr />
      </>
    );
  }, [su, login, logout, snsLogin]);
};

export default Header;
