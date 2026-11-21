-- Run once in your Supabase project's SQL Editor.
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  due_date date not null,
  completed boolean not null default false
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);
alter table public.tasks enable row level security;
revoke all on public.tasks from anon;
grant select, insert, delete on public.tasks to authenticated;
grant update (title, description, due_date, completed) on public.tasks to authenticated;

-- Only Supabase Auth can assign app_metadata.role = 'admin'.
create policy "Read own tasks or all tasks as admin" on public.tasks
for select to authenticated
using ((select auth.uid()) = user_id or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Create own tasks" on public.tasks
for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "Update own tasks or all tasks as admin" on public.tasks
for update to authenticated
using ((select auth.uid()) = user_id or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.uid()) = user_id or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Delete own tasks or all tasks as admin" on public.tasks
for delete to authenticated
using ((select auth.uid()) = user_id or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
