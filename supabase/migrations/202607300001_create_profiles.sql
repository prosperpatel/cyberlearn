-- Migration: create profiles table for onboarding
-- Apply this in your Supabase dashboard under SQL Editor before using the onboarding flow.
-- If migrating from an older profiles schema, drop the existing table first.

create table if not exists public.profiles (
  id           uuid        primary key references auth.users(id) on delete cascade,
  username     text        not null unique check (username ~ '^[a-z0-9_]{3,24}$'),
  display_name text        not null,
  avatar_url   text,
  goal         text        not null,
  experience   text        not null,
  country      text        not null,
  daily_goal   integer     not null check (daily_goal in (15, 30, 45, 60, 90)),
  interests    text[]      not null default '{}',
  xp           integer     not null default 0,
  level        integer     not null default 1,
  streak       integer     not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can create own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- PostgREST requires explicit GRANT even when RLS policies are present.
-- Without these, every INSERT/SELECT returns 42501 "permission denied for table profiles"
-- before RLS is evaluated.
grant select, insert, update on public.profiles to authenticated;
grant select                  on public.profiles to anon;
