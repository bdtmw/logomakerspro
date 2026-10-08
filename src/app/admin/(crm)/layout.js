import AdminNav from '@/components/admin/AdminNav';
import { requireAdmin } from '@/lib/server/admin-auth';
import { dbConfigured } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export default async function CrmLayout({ children }) {
  // Each page checks too: a layout can be skipped when only the page segment re-renders.
  await requireAdmin();
  return (
    <div className="crm-app">
      <AdminNav />
      <div className="crm-main">
        {dbConfigured() ? (
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
