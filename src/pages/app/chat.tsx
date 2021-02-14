import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import * as _ from 'lodash';
import moment from 'moment';
moment.locale('ja');

import Section from '../../templates/section';

import { Constant } from '../../constant';
import firebase from '../../firebase/chat';

const reactStringReplace = require('react-string-replace');

const pushNotification = async (message: string) => {
  const url = 'https://yuzuru-line.netlify.app/.netlify/functions/api/v1/push';
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  fetch(url, {
    method: 'post',
    headers: {
      Authorization: 'Bearer abc',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
    }),
  });
};

const Loading = () => {
  return (
    <>
      <div>
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ({ location }: { location: { pathname: string } }) => {
  const table = { boards: 'boards' };

  const comment = (message: string) => {
    return (
      <>
        {reactStringReplace(
          message,
          /(https?:\/\/\S+)/g,
          (match: string, j: number) => (
            <a
              href={match}
              key={match + j}
              target="_blank"
              rel="noopener noreferrer"
            >
              {match}
            </a>
          )
        )}
      </>
    );
  };

  const Children = () => {
    const [uid, setUid] = React.useState('');
    const [snsLogin, setSnsLogin] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [list, setList] = React.useState(
      [] as {
        uid: string;
        uname?: string;
        image?: boolean;
        message: string;
        createdAt: number;
      }[]
    );

    const dom_textarea = React.useRef<HTMLTextAreaElement>();

    const methods = useForm<{ name: string; message: string }>({
      mode: 'onChange',
      defaultValues: { name: '名無し', message: '' },
    });

    const onSubmit = methods.handleSubmit(async data => {
      const _message = data.message;
      methods.reset();
      dom_textarea.current?.blur();

      setTimeout(() => {
        dom_textarea.current?.focus();
      }, 500);

      await firebase.database().ref(table.boards).push({
        uid: uid,
        uname: data.name,
        message: _message.trim(),
        image: false,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      });

      pushNotification(`${uid}\n\n${_message.trim()}`);
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

        if (data.providerData.length !== 0) {
          setSnsLogin(true);
        }

        setUid((await firebase.auth().currentUser?.uid) as string);

        // 通知
        pushNotification((await firebase.auth().currentUser?.uid) as string);

        firebase
          .database()
          .ref(table.boards)
          .orderByChild('createdAt')
          .limitToLast(50)
          .on('value', snapshot => {
            // console.log(snapshot.val());

            let _data: any[] = [];
            snapshot.forEach(childSnapshot => {
              _data.push(childSnapshot.val());
            });

            setList(_.orderBy(_data, 'createdAt', 'desc'));
            setLoading(false);
          });

        // 削除
        // firebase
        //   .database()
        //   .ref(table.boards)
        //   .child('-MTPEcnh5mmAl8_QtJqM')
        //   .remove();
      });
      return () => {
        firebase
          .database()
          .ref(table.boards)
          .orderByChild('createdAt')
          .limitToLast(50)
          .off('value');
      };
    }, []);

    if (loading) {
      return <Loading />;
    }

    const boards = list.map((m, i) => {
      if (m.uid === uid) {
        // 右吹き出し
        return (
          <div key={i}>
            <div className="clearfix">
              <div className="float-end">
                <div style={{ fontSize: 12, color: '#fff' }}>
                  {m.uname === undefined ? '名無し' : m.uname}
                </div>
                <div style={{ fontSize: 12, color: '#fff' }}>{m.uid}</div>
              </div>
            </div>

            <div className="clearfix">
              <div className="balloon2 float-end">
                {m.image === true ? (
                  <img src={m.message} alt="画像" width="100%" />
                ) : (
                  comment(m.message)
                )}
              </div>
            </div>
            <div className="clearfix">
              <div className="float-end">
                <time style={{ fontSize: 12 }}>
                  {moment(new Date(m.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
                </time>
              </div>
            </div>
            <br />
          </div>
        );
      }

      // 左吹き出し
      return (
        <div key={i}>
          <div style={{ fontSize: 12, color: '#fff' }}>
            {m.uname === undefined ? '名無し' : m.uname}
          </div>

          <div style={{ fontSize: 12, color: '#fff' }}>{m.uid}</div>
          <div className="clearfix">
            <div className="balloon1 float-start">
              {m.image === true ? (
                <>
                  <img src={m.message} alt="画像" width="100%" />
                </>
              ) : (
                comment(m.message)
              )}
            </div>
          </div>
          <div className="clearfix">
            <div>
              <time style={{ fontSize: 12 }}>
                {moment(new Date(m.createdAt)).format('YYYY-MM-DD HH:mm:ss')}
              </time>
            </div>
          </div>
          <br />
        </div>
      );
    });

    return (
      <>
        <Helmet>
          <link rel="stylesheet" href="/css/chat.css" />
        </Helmet>

        <div className="float-end">
          {snsLogin === false ? (
            <button
              type="button"
              className="btn btn-success"
              onClick={async () => {
                const provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithRedirect(provider);
              }}
            >
              ログイン
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!window.confirm('ログアウトしますか?')) {
                  return;
                }
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(() => {});
              }}
            >
              ログアウト
            </button>
          )}
        </div>

        <label>
          <span className="btn btn-info">
            画像アップロード
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={e => {
                if (e.target.files == null) {
                  return;
                }

                setLoading(true);

                const _s = 'abcdefghijklmnopqrstuvwxyz0123456789';
                const _fileName =
                  [...Array(10)]
                    .map(() => _s[Math.floor(Math.random() * _s.length)])
                    .join('') + new Date().getTime();

                const _storageRef = firebase.storage().ref().child(_fileName);

                const uname =
                  methods.getValues('name') === ''
                    ? '名無し'
                    : methods.getValues('name');

                // 画像保存
                _storageRef
                  .put(e.target.files[0])
                  .then(() => {
                    _storageRef.getDownloadURL().then(async (url: string) => {
                      // データ保存
                      await firebase.database().ref(table.boards).push({
                        uid: uid,
                        uname: uname,
                        message: url,
                        image: true,
                        createdAt: new Date().getTime(),
                        updatedAt: new Date().getTime(),
                      });

                      setLoading(false);
                    });
                  })
                  .catch(() => {
                    alert('画像のサイズは5MBまでです。');
                    window.location.reload();
                  });
              }}
            />
          </span>
        </label>
        <hr />

        <form
          onSubmit={onSubmit}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
        >
          <div className="form-group text-center">
            <input
              name="name"
              ref={methods.register({
                required: '必須項目です',
                maxLength: {
                  value: 15,
                  message: '15文字以内で入力してください',
                },
              })}
              required
              maxLength={15}
              placeholder="ハンネ"
              size={30}
            />
          </div>

          <br />

          <div className="form-group">
            <textarea
              id="textarea"
              className="form-control"
              style={{ maxWidth: 400, margin: '0 auto' }}
              name="message"
              ref={(e: HTMLTextAreaElement) => {
                methods.register(e, {
                  required: '必須項目です',
                  maxLength: {
                    value: 150,
                    message: '150文字以内で入力してください',
                  },
                });

                dom_textarea.current = e;
              }}
              placeholder="メッセージ 150文字以内"
              required
              maxLength={150}
              rows={3}
            ></textarea>

            <div className="text-center">
              <input type="submit" value="投稿" className="btn btn-primary" />
            </div>
          </div>
        </form>

        <hr />

        <p>最新50件</p>
        <div className="line-bc">{boards}</div>
      </>
    );
  };

  return (
    <Section
      titie="リアルタイムチャット"
      description={`リアルタイムチャット | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      children={<Children />}
    />
  );
};
