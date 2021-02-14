import React from 'react';
import { useForm } from 'react-hook-form';
import copy from 'copy-to-clipboard';

import Section from '../../templates/section';

import { Constant } from '../../constant';

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
  const Children = () => {
    const [loading, setLoading] = React.useState(false);
    const [url, setUrl] = React.useState('');

    const MY_DOMAIN = 'https://odbri1u2.page.link';
    const API_KEY = 'AIzaSyB8olQXWPvTu9nehgWClS7PZzRLKUrqEtw';

    const methods = useForm<{ url: string }>({
      mode: 'onChange',
      defaultValues: { url: '' },
    });

    const onSubmit = methods.handleSubmit(data => {
      setLoading(true);

      // apiたたく
      fetch(
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' +
          API_KEY,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            longDynamicLink: MY_DOMAIN + '/?link=' + data.url,
            suffix: {
              option: 'SHORT',
            },
          }),
        }
      ).then(res => {
        res.json().then(json => {
          setUrl(json['shortLink']);
          methods.reset();
          setLoading(false);
        });
      });
    });

    if (loading) {
      return (
        <>
          <Loading />
        </>
      );
    }

    return (
      <>
        <div
          style={{
            background: '#fff',
            padding: '0 10px',
            minHeight: 500,
          }}
        >
          <h1>短縮URLを生成する</h1>

          <form onSubmit={onSubmit}>
            <div className="input-group">
              <input
                type="url"
                name="url"
                className="form-control"
                placeholder="QRコードにしたいURLを入力"
                required
                ref={methods.register({
                  required: '必須項目です',
                })}
              />

              <div className="input-group-append">
                <input type="submit" className="btn btn-success" value="作成" />
              </div>
            </div>
          </form>

          <br />

          {url.length !== 0 && (
            <>
              <h2>短縮URL</h2>
              <div style={{ textAlign: 'center' }}>
                <div className="input-group">
                  <input
                    className="form-control"
                    disabled
                    placeholder="短縮URL"
                    value={url}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => {
                        copy(url);
                        alert('コピーしました');
                      }}
                    >
                      コピー
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <Section
      titie="短縮URLを生成するページ"
      description={`短縮URLを生成するページ | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      children={<Children />}
    />
  );
};
