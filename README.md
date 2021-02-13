# gatsby-blog

## 動的ルーティング

### src/pages/sites

```
import * as React from 'react';
import { Router, RouteComponentProps, Link, navigate } from '@reach/router';
// import { Link } from 'gatsby';

import Section from '../templates/section';
import { Loading } from '../components/loading';

import { Constant } from '../constant';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;

const base = '/sites';

const Home = (params: { location: { pathname: string } }) => {
  React.useEffect(() => {
    return () => {};
  }, []);
  return (
    <>
      <h2>Home</h2>
      <br />
      <Link to="/sites">Home</Link>
      <br />
      <Link to="/sites/page1">page1</Link>
      <br />
      <Link to="/sites/page2">page2</Link>
      <br />
    </>
  );
};
const Page1 = (params: { location: { pathname: string } }) => {
  return (
    <>
      <h2>Page1</h2>

      <Link to="/sites">Home</Link>
      <br />
      <Link to="/sites/page1">page1</Link>
      <br />
      <Link to="/sites/page2">page2</Link>
      <br />
    </>
  );
};

const Page2 = (params: { location: { pathname: string } }) => {
  return (
    <>
      <h2>Page2</h2>
      <Link to="/sites">Home</Link>
      <br />
      <Link to="/sites/page1">page1</Link>
      <br />
      <Link to="/sites/page2">page2</Link>
      <br />
    </>
  );
};

const NotFound = (params: { location: { pathname: string } }) => {
  React.useEffect(() => {
    navigate('/404');
    return () => {};
  }, []);

  return <Loading />;
};

export default ({ location }: { location: { pathname: string } }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(true);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Router>
        <RouterPage
          path={`${base}/page1`}
          pageComponent={
            <Section
              titie="Page1"
              description={`Page1 | ${Constant.title}`}
              url={`${Constant.url}${location.pathname}`}
              image_path={null}
              children={<Page1 location={location} />}
            />
          }
        />
        <RouterPage
          path={`${base}/page2`}
          pageComponent={
            <Section
              titie="Page2"
              description={`Page2 | ${Constant.title}`}
              url={`${Constant.url}${location.pathname}`}
              image_path={null}
              children={<Page2 location={location} />}
            />
          }
        />
        <RouterPage
          path={`${base}`}
          pageComponent={
            <Section
              titie="sites home"
              description={`sites home | ${Constant.title}`}
              url={`${Constant.url}${location.pathname}`}
              image_path={null}
              children={<Home location={location} />}
            />
          }
        />
        <RouterPage
          pageComponent={<NotFound location={location} />}
          default={true}
        />
      </Router>
    </>
  );
};
```