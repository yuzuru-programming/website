import React from 'react';
import { graphql, navigate } from 'gatsby';

import Articles from '../components/articles';
import Chart from './chart';

import { Constant } from '../constant';
interface Props {
  data: GatsbyTypes.ArchivesTemplateQuery;
  pageContext: {
    humanPageNumber: number;
  };
  pathContext: { count: number; archive: string };
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
              navigate(`/archives/${pathContext.archive}`);
            } else {
              navigate(`/archives/${pathContext.archive}/page/${num}/`);
            }
          }}
        />
      </>
    );
  };

  return (
    <Chart
      titie={`アーカイブ | ${pathContext.archive}`}
      description={`アーカイブ | ${pathContext.archive} | ${Constant.title}`}
      url={`${Constant.url}${location.pathname}`}
      image_path={null}
      breadcrumb={['アーカイブ', pathContext.archive]}
      children={<Children />}
    />
  );
};

export const pageQuery = graphql`
  query ArchivesTemplate($skip: Int!, $limit: Int!, $archive: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { archives: { eq: $archive } } }
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
