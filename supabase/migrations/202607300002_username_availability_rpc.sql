-- RPC: check_username_available
--
-- Returns true when p_username is not already taken by another user.
-- Uses SECURITY DEFINER so it can bypass the profiles RLS (which restricts
-- SELECT to the owner's own row), enabling any authenticated caller to check
-- availability without exposing other users' profile data.

create or replace function public.check_username_available(
  p_username     text,
  p_current_user uuid default null
)
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select not exists (
    select 1
    from   public.profiles
    where  username = p_username
    and    (p_current_user is null or id != p_current_user)
  );
$$;

-- Allow any authenticated user to call this function.
grant execute on function public.check_username_available(text, uuid) to authenticated;
