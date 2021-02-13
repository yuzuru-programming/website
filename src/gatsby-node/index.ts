import { resolve } from 'path';
import type { GatsbyNode, Actions, Node } from 'gatsby';
import { Constant } from '../constant';
const { paginate } = require('gatsby-awesome-pagination');

type AllPosts = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: {
            slug: string;
          };
        };
      }
    ];
  };
};

type TagsData = {
  allMarkdownRemark: {
    group: [
      {
        fieldValue: string;
        totalCount: number;
        nodes: {
          frontmatter: {
            slug: string;
            title: string;
            tags: string;
          };
        };
      }
    ];
  };
};

type ArchivesData = {
  allMarkdownRemark: {
    group: [
      {
        fieldValue: string;
        totalCount: number;
        nodes: {
          frontmatter: {
            slug: string;
            title: string;
            tags: string;
          };
        };
      }
    ];
  };
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  // 全記事
  const data = (await graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `)) as {
    error: string;
    data: AllPosts;
  };

  const tags_data = (await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
              slug
              title
              tags
            }
          }
        }
      }
    }
  `)) as {
    error: string;
    data: TagsData;
  };

  const archives_data = (await graphql(`
    query CreateArchives {
      allMarkdownRemark {
        group(field: frontmatter___archives) {
          fieldValue
          totalCount
          nodes {
            frontmatter {
              slug
              title
              tags
              archives
            }
          }
        }
      }
    }
  `)) as {
    error: string;
    data: ArchivesData;
  };

  // 記事作成
  (() => {
    data.data.allMarkdownRemark.edges.forEach(m => {
      const slug = m['node']['frontmatter']['slug'];

      if (slug) {
        actions.createPage({
          path: slug,
          component: resolve('src/templates/single.tsx'),
          context: { slug },
        });
      }
    });
  })();

  // 記事一覧
  (() => {
    paginate({
      createPage,
      items: data.data.allMarkdownRemark.edges,
      component: resolve('src/templates/index.tsx'),
      itemsPerPage: Constant.pagenate,
      context: {
        count: data.data.allMarkdownRemark.edges.length,
      },
      pathPrefix: (params: { pageNumber: number }) =>
        params.pageNumber === 0 ? '/' : `/page`,
    });
  })();

  // タグ一覧
  (() => {
    tags_data.data.allMarkdownRemark.group.forEach(m => {
      paginate({
        createPage,
        items: m.nodes,
        itemsPerPage: Constant.pagenate,
        pathPrefix: (params: { pageNumber: number }) =>
          params.pageNumber === 0
            ? `/tags/${m.fieldValue}`
            : `/tags/${m.fieldValue}/page`,
        component: resolve('src/templates/tags.tsx'),
        context: {
          tag: m.fieldValue,
          count: m.totalCount,
        },
      });
    });
  })();

  // アーカイブ一覧
  (() => {
    archives_data.data.allMarkdownRemark.group.forEach(m => {
      paginate({
        createPage,
        items: m.nodes,
        itemsPerPage: Constant.pagenate,
        pathPrefix: (params: { pageNumber: number }) =>
          params.pageNumber === 0
            ? `/archives/${m.fieldValue}`
            : `/archives/${m.fieldValue}/page`,
        component: resolve('src/templates/archives.tsx'),
        context: {
          archive: m.fieldValue,
          count: m.totalCount,
        },
      });
    });
  })();
};

// https://wp-kyoto.net/routing-for-client-site-by-using-typescript-and-gatsby/
// export const onCreatePage: GatsbyNode['onCreatePage'] = async ({
//   page,
//   actions,
// }) => {
//   const targetPath = 'sites';
//   const path = typeof page.path === 'string' ? page.path : '';
//   const component = typeof page.component === 'string' ? page.component : '';
//   const context = (page.context || {}) as Record<string, unknown>;
//   const regExp = new RegExp(`^\/${targetPath}`);

//   if (!path || !component) return;
//   if (!path.match(regExp)) return;

//   // actions.createPage({
//   //   path,
//   //   component,
//   //   context,
//   //   matchPath: `/${targetPath}/*`,
//   // });

//   actions.createPage(page);
// };
