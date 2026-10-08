'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="crm-form">
      <input type="hidden" name="next" value={next} />
      <label>
        Password
        <input type="password" name="password" required autoFocus autoComplete="current-password" />
      </label>
      {state?.error && (
        <p className="crm-error" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" className="crm-btn crm-btn--primary" disabled={pending}>
        {pending ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
