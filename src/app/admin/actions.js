'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { COOKIE, loginLimited, passwordMatches, requireAdmin, sessionCookie } from '@/lib/server/admin-auth';
import { addNote, createLead, deleteLead, setStatus, updateLead } from '@/lib/server/crm';

const field = (form, name) => String(form.get(name) ?? '');
const leadId = (form) => {
  const id = field(form, 'id');
  if (!/^\d+$/.test(id)) throw new Error('Invalid lead');
  return id;
};

export async function login(_state, form) {
  const h = await headers();
  const ip = (h.get('x-forwarded-for') || '').split(',')[0].trim() || h.get('x-real-ip') || 'unknown';
  if (loginLimited(ip)) return { error: 'Too many attempts. Try again in 15 minutes.' };
  if (!passwordMatches(field(form, 'password'))) return { error: 'Wrong password.' };
  const { name, value, options } = sessionCookie();
  (await cookies()).set(name, value, options);
  const next = field(form, 'next');
  redirect(next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin');
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect('/admin/login');
}

export async function saveLead(form) {
  await requireAdmin();
  const id = leadId(form);
  await updateLead(id, Object.fromEntries(form));
  revalidatePath('/admin', 'layout');
  redirect(`/admin/leads/${id}?saved=1`);
}

export async function moveLead(form) {
  await requireAdmin();
  await setStatus(leadId(form), field(form, 'status'));
  revalidatePath('/admin', 'layout');
}

export async function saveNote(form) {
  await requireAdmin();
  const id = leadId(form);
  await addNote(id, field(form, 'body'));
  revalidatePath(`/admin/leads/${id}`);
}

export async function addLead(form) {
  await requireAdmin();
  if (!field(form, 'name').trim() && !field(form, 'email').trim()) redirect('/admin/leads/new?error=1');
  const id = await createLead(Object.fromEntries(form));
  revalidatePath('/admin', 'layout');
  redirect(`/admin/leads/${id}`);
}

export async function removeLead(form) {
  await requireAdmin();
  await deleteLead(leadId(form));
  revalidatePath('/admin', 'layout');
  redirect('/admin/leads');
}
