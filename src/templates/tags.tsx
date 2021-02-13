import React from 'react';
import { graphql, navigate } from 'gatsby';

import Articles from '../components/articles';
import Chart from './chart';

import { Constant } from '../constant';
interface Props {
  data: GatsbyTypes.TagsTemplateQuery;
  pageContext: {
    humanPageNumber: number;
  };
  pathContext: { count: number; tag: string };
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
              navigate(`/tags/${pathContext.tag}`);
            } else {
              navigate(`/tags/${pathContext.tag}/page/${num}/`);
            }
          }}
        />
      </>
    );
  };

  return (
    <Chart
      titie={`タグ | ${pathContext.tag}`}
      description={`タグ | ${pathContext.tag} | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      breadcrumb={['タグ', pathContext.tag]}
      children={<Children />}
    />
  );
};

export const pageQuery = graphql`
  query TagsTemplate($skip: Int!, $limit: Int!, $tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
