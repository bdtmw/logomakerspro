import './admin.css';

export const metadata = {
  title: { default: 'CRM', template: '%s · CRM · Logo Makers Pro' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="crm">{children}</div>;
}
