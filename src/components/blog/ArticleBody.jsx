import Link from 'next/link';
import { packageCategories } from '@/data/packages';

// Feature lines that are the same on every package; left out of the comparison so the differences stand out.
const COMMON = /guarantee|satisfaction|ownership|money back|tat\b|turn ?around|account manager/i;

/** Live package prices for a category, as a comparison table. */
function PackagesTable({ category }) {
  const cat = packageCategories[category];
  if (!cat) return null;
  return (
    <div className="lmp-article__table">
      <table>
        <thead>
          <tr>
            <th scope="col">Package</th>
            <th scope="col">Price</th>
            <th scope="col">What’s included</th>
          </tr>
        </thead>
        <tbody>
          {cat.cards.map((c) => (
            <tr key={c.id}>
              <th scope="row">{c.title.join(' ')}</th>
              <td data-label="Price">{c.priceLabel}</td>
              <td data-label="What’s included">{c.features.filter((f) => !COMMON.test(f)).slice(0, 4).join(' · ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="lmp-article__table-note">
        Prices as listed on our <Link href={`/${category}-package`}>{cat.heading.toLowerCase()}</Link> page.
      </p>
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={block.id}>{block.text}</h2>;
    case 'p':
      return <p>{block.text}</p>;
    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className={block.ordered ? 'lmp-article__ol' : 'lmp-article__ul'}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </List>
      );
    }
    case 'table':
      return (
        <div className="lmp-article__table">
          <table>
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th scope="col" key={h}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th scope="row" key={i}>
                        {cell}
                      </th>
                    ) : (
                      <td key={i} data-label={block.head[i]}>
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {block.note && <p className="lmp-article__table-note">{block.note}</p>}
        </div>
      );
    case 'packages':
      return <PackagesTable category={block.category} />;
    case 'note':
      return <p className="lmp-article__note">{block.text}</p>;
    default:
      return null;
  }
}

/** A blog post body from its block list in src/data/blog.jsx, with a contents list built from its H2s. */
export default function ArticleBody({ blocks }) {
  const headings = blocks.filter((b) => b.type === 'h2');
  return (
    <div className="lmp-article__body">
      {headings.length > 2 && (
        <nav className="lmp-article__toc" aria-label="Contents">
          <p>Contents</p>
          <ol>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {blocks.map((b, i) => (
        <Block block={b} key={i} />
      ))}
    </div>
  );
}
