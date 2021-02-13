import React from 'react';

import Section from '../templates/section';
import { Loading } from '../components/loading';

import { Constant } from '../constant';

export default ({ location }: { location: { pathname: string } }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, []);

  const Children = () => {
    return (
      <>
        <h1>ページが見つかりませんでした</h1>
      </>
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Section
      titie="404ページ"
      description={`404ページ | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      children={<Children />}
    />
  );
};
