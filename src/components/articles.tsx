import React from 'react';
import { Link } from 'gatsby';
import Pagination from 'react-js-pagination';

import { Constant } from '../constant';

export default (params: {
  humanPageNumber: number;
  count: number;
  func: (num: number) => void;
  data: readonly {
    readonly node: {
      readonly frontmatter: GatsbyTypes.Maybe<
        Pick<
          GatsbyTypes.MarkdownRemarkFrontmatter,
          'slug' | 'title' | 'tags' | 'date'
        >
      >;
    };
  }[];
}) => {
  return (
    <>
      {params.data.map((m, i) => {
        return (
          <div key={i}>
            <div className="card">
              <div className="card-body" style={{ paddingBottom: 0 }}>
                {/* タイトル */}
                <h2 style={{ fontSize: 18 }}>
                  <Link
                    to={m.node.frontmatter?.slug as string}
                    style={{ color: 'black', textDecoration: 'none' }}
                  >
                    {m.node.frontmatter?.title}
                  </Link>
                </h2>

                {/* タグ */}
                <div className="_tagWrapper">
                  {m.node.frontmatter?.tags?.map((tag, j) => {
                    return (
                      <div className="_tag" key={j}>
                        <Link
                          to={`/tags/${tag}`}
                          style={{ textDecoration: 'none' }}
                        >
                          {tag}
                        </Link>
                      </div>
                    );
                  })}
                </div>

                {/* 日付 */}
                <div style={{ fontSize: 15, textAlign: 'right' }}>
                  <time>{m.node.frontmatter?.date}</time>
                </div>
              </div>
            </div>
            <br />
          </div>
        );
      })}

      <div className="d-flex justify-content-center">
        <Pagination
          activePage={params.humanPageNumber}
          itemsCountPerPage={Constant.pagenate}
          totalItemsCount={params.count}
          onChange={params.func}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>

      <hr />
    </>
  );
};
