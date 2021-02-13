import React from 'react';
import { useForm } from 'react-hook-form';

import Section from '../../templates/section';

import { Constant } from '../../constant';

export default ({ location }: { location: { pathname: string } }) => {
  const Children = () => {
    const [url, setUrl] = React.useState('');
    const width = '250';

    const methods = useForm<{ url: string }>({
      mode: 'onChange',
      defaultValues: { url: '' },
    });

    const onSubmit = methods.handleSubmit(data => {
      setUrl(
        `https://chart.apis.google.com/chart?cht=qr&chs=${width}x${width}&chl=${encodeURI(
          data.url
        )}`
      );
      methods.reset();
    });

    return (
      <>
        <div
          style={{
            background: '#fff',
            padding: '0 10px',
            minHeight: 500,
          }}
        >
          <h1>QRコードを生成する</h1>

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

          <div style={{ textAlign: 'center' }}>
            <img src={url} alt="" width={width} />
          </div>
        </div>
      </>
    );
  };

  return (
    <Section
      titie="QRコードを生成するページ"
      description={`QRコードを生成するページ | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      children={<Children />}
    />
  );
};
