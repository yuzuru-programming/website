import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

export default () => {
  const data = useStaticQuery<GatsbyTypes.AsideComponentQuery>(graphql`
    query AsideComponent {
      archive: allMarkdownRemark {
        group(field: frontmatter___archives) {
          archives: fieldValue
          totalCount
        }
      }

      tag: allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  return (
    <div style={{ width: '90%', margin: '0 auto' }}>
      <div>タグ</div>
      <ul className="list-group">
        {data.tag.group.map((m, i) => {
          return (
            <li key={i} className="list-group-item">
              <div className="_tagWrapper">
                <div className="_tag" style={{ fontSize: 18 }}>
                  <Link
                    to={`/tags/${m.tag}`}
                    style={{ textDecoration: 'none' }}
                  >
                    {`${m.tag} `}
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <hr />
      <div>アーカイブ</div>
      <ul className="list-group">
        {data.archive.group.map((m, i) => {
          return (
            <li key={i} className="list-group-item">
              <Link
                to={`/archives/${m.archives}`}
                style={{ textDecoration: 'none', fontSize: 18 }}
              >
                {`${m.archives} `}
              </Link>
              {`(${m.totalCount})`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
