import React from 'react';
import { graphql, navigate } from 'gatsby';

import Articles from '../components/articles';
import Chart from './chart';

import { Constant } from '../constant';

interface Props {
  data: GatsbyTypes.ArticlesTemplateQuery;
  pageContext: {
    humanPageNumber: number;
  };
  pathContext: { count: number };
  location: { pathname: string };
}

export default ({ data, pageContext, pathContext, location }: Props) => {
  const Children = () => {
    return (
      <>
        <Articles
          data={data.allMarkdownRemark.edges}
          humanPageNumber={pageContext.humanPageNumber}
          count={pathContext.count}
          func={(num: number) => {
            if (num === 1) {
              navigate(`/`);
            } else {
              navigate(`/page/${num}`);
            }

            window.scrollTo(0, 0);
          }}
        />
      </>
    );
  };

  return (
    <Chart
      titie={''}
      description={`${Constant.description}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      breadcrumb={[]}
      children={<Children />}
    />
  );
};

export const pageQuery = graphql`
  query ArticlesTemplate($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            tags
            date(formatString: "YYYY-MM-DD", locale: "ja-JP")
          }
        }
      }
    }
  }
`;
