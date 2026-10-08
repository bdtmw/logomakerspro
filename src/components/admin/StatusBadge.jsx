import { statusOf } from '@/lib/crm-constants';

export default function StatusBadge({ status }) {
  const s = statusOf(status);
  return <span className={s.badge}>{s.label}</span>;
}
