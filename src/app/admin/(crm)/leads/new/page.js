import LeadFields from '@/components/admin/LeadFields';
import { addLead } from '@/app/admin/actions';
import { requireAdmin } from '@/lib/server/admin-auth';

export const metadata = { title: 'Add lead' };

export default async function NewLeadPage({ searchParams }) {
  await requireAdmin();
  const { error } = await searchParams;
  return (
    <>
      <header className="crm-head">
        <h1>Add lead</h1>
      </header>
      <form action={addLead} className="crm-card crm-form">
        <p className="crm-muted">For leads from calls, email or referrals. Website leads are added automatically.</p>
        {error && (
          <p className="crm-error" role="alert">
            Add at least a name or an email.
          </p>
        )}
        <LeadFields withMessage />
        <div className="crm-actions">
          <button type="submit" className="crm-btn crm-btn--primary">
            Save lead
          </button>
        </div>
      </form>
    </>
  );
}
