import { STATUSES } from '@/lib/crm-constants';
import { isoDay } from '@/lib/crm-format';

/** Contact and deal fields, shared by the add and edit forms. */
export default function LeadFields({ lead = {}, withMessage = false }) {
  return (
    <div className="crm-fields">
      <label>
        Name
        <input name="name" defaultValue={lead.name} maxLength={200} />
      </label>
      <label>
        Email
        <input name="email" type="email" defaultValue={lead.email} maxLength={200} />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" defaultValue={lead.phone} maxLength={50} />
      </label>
      <label>
        Company
        <input name="company" defaultValue={lead.company} maxLength={200} />
      </label>
      <label className="crm-fields__wide">
        Interested in
        <input name="interest" defaultValue={lead.interest} maxLength={300} placeholder="e.g. Logo Gold, website for a bakery" />
      </label>
      <label>
        Status
        <select name="status" defaultValue={lead.status || 'new'}>
          {STATUSES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Deal value (USD)
        <input name="value" inputMode="decimal" defaultValue={lead.value ?? ''} placeholder="e.g. 499" />
      </label>
      <label>
        Follow up on
        <input name="follow_up" type="date" defaultValue={isoDay(lead.follow_up)} />
      </label>
      {withMessage && (
        <label className="crm-fields__wide">
          Notes about the project
          <textarea name="message" rows={4} defaultValue={lead.message} />
        </label>
      )}
    </div>
  );
}
