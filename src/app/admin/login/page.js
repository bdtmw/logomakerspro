import { redirect } from 'next/navigation';
import { adminConfigured, isAdmin } from '@/lib/server/admin-auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Log in' };

export default async function LoginPage({ searchParams }) {
  const { next = '' } = await searchParams;
  if (await isAdmin()) redirect('/admin');
  return (
    <div className="crm-login">
      <div className="crm-card crm-login__card">
        <p className="crm-nav__brand">
          Logo Makers Pro <span>CRM</span>
        </p>
        {adminConfigured() ? (
          <LoginForm next={typeof next === 'string' ? next : ''} />
        ) : (
          <p>
            Set <code>ADMIN_PASSWORD</code> (at least 8 characters) in the server environment, then redeploy to turn
            the CRM on.
          </p>
        )}
      </div>
    </div>
  );
}
