import React from 'react';

import Section from '../templates/section';

import { Constant } from '../constant';

export default ({ location }: { location: { pathname: string } }) => {
  const Children = () => {
    return (
      <>
        <div
          style={{
            background: '#fff',
            padding: '0 10px',
            minHeight: 500,
          }}
        >
          <h1>お問い合わせ</h1>
          <p>なにかありましたらツイッターにDMください</p>
          <a
            href="https://twitter.com/yuzuru_program"
            target="_blank"
            rel="noopener noreferrer"
          >
            ツイッター
          </a>
        </div>
      </>
    );
  };

  return (
    <Section
      titie="お問い合わせ"
      description={`お問い合わせ | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      children={<Children />}
    />
  );
};
