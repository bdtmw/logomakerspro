import { packageCategories, packagesTabOrder } from '@/data/packages';
import Tabs from '@/components/ui/Tabs';
import PackageCard from './PackageCard';

function CardGrid({ cards, forceQuote, popular }) {
  return (
    <div className="row">
      {cards.map((pkg) => (
        <div className="col-sm-4" key={pkg.id}>
          <PackageCard pkg={pkg} forceQuote={forceQuote} popular={pkg.id === popular} />
        </div>
      ))}
    </div>
  );
}

function Shell({ className, id, children }) {
  return (
    <section className={className} id={id}>
      <div className="packages-row">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Pricing cards for one category (category pages and the home page). */
export function CategoryPackages({ category, forceQuote = false, className = 'price__area pt-80 pb-100', id, popular, before }) {
  const cat = packageCategories[category];
  return (
    <Shell className={className} id={id}>
      {before}
      <div className="packagestabs">
        <h2 className="packages-heading">{cat.heading}</h2>
      </div>
      <div className="packagescontent">
        <div className="tab-content">
          <div className="tab-pane fade show active" role="tabpanel">
            <CardGrid cards={cat.cards} forceQuote={forceQuote} popular={popular} />
          </div>
        </div>
      </div>
    </Shell>
  );
}

/** All categories in tabs (/packages). */
export function AllPackages() {
  const tabs = packagesTabOrder.map((t) => ({
    label: t.label,
    content: (
      <>
        <h2 className="packages-panel-heading">{packageCategories[t.category].heading}</h2>
        <CardGrid cards={packageCategories[t.category].cards} />
      </>
    ),
  }));
  return (
    <Shell className="price__area pt-130 pb-140">
      <Tabs tabs={tabs} />
    </Shell>
  );
}
