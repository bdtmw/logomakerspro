import AdminNav from '@/components/admin/AdminNav';
import { requireAdmin } from '@/lib/server/admin-auth';
import { db, dbConfigured } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export default async function CrmLayout({ children }) {
  // Each page checks too: a layout can be skipped when only the page segment re-renders.
  await requireAdmin();
  // Connect up front so a database problem shows its reason here instead of a blank error page.
  let dbError = '';
  if (dbConfigured()) {
    try {
      await db();
    } catch (err) {
      console.error('crm: database connection failed', err);
      dbError = err?.message || String(err);
    }
  }
  return (
    <div className="crm-app">
      <AdminNav />
      <div className="crm-main">
        {dbError ? (
          <div className="crm-card crm-setup">
            <h1>Can't reach the database</h1>
            <p>
              <code>DATABASE_URL</code> is set, but connecting failed with:
            </p>
            <pre className="crm-setup__error">{dbError}</pre>
            <p>
              Check that the connection string is complete (it usually ends in <code>?sslmode=require</code>), that the
              database isn't paused, and that the variable is set for the Production environment in Vercel. Then
              redeploy.
            </p>
          </div>
        ) : dbConfigured() ? (
          children
        ) : (
          <div className="crm-card crm-setup">
            <h1>Connect a database</h1>
            <p>
              The CRM stores leads in Postgres. In Vercel, open the project, go to <strong>Storage</strong>, add a{' '}
              <strong>Neon</strong> (or Supabase) Postgres database and connect it to this project. That sets{' '}
              <code>DATABASE_URL</code>. Redeploy, and the tables are created automatically on first use.
            </p>
            <p>Until then, form submissions are still emailed to you as before.</p>
          </div>
        )}
      </div>
    </div>
  );
}
