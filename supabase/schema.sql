-- Aqua 短片 content tables. Run once in the Supabase SQL Editor, then run seed.sql.
-- The site reads these with the public (anon) key, so row-level security only lets it
-- see visible films and the settings row. Edit the data in the Table Editor.

create table if not exists public.videos (
  id text primary key,
  -- false hides the film from the site without deleting it.
  visible boolean not null default true,
  -- Smaller numbers come first.
  sort_order integer not null default 1000,
  title text not null,
  genre text not null,
  description text not null default '',
  studio text not null,
  duration integer not null,
  width integer not null default 1920,
  height integer not null default 1080,
  license text not null,
  src text not null,
  src_hd text not null,
  src_4k text,
  poster text not null,
  poster_width integer,
  poster_height integer,
  poster_credit text,
  still text not null,
  source_page text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists videos_visible_order_idx on public.videos (visible, sort_order);

-- A single row (id = 1) of homepage copy.
create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  -- Small line under the logo.
  tagline text not null default '',
  -- Banner title, two lines; leave both empty to hide the title.
  promo_title_line1 text not null default '',
  promo_title_line2 text not null default '',
  -- Banner paragraph; {count} is replaced with the number of visible films.
  promo_text text not null default '',
  -- Film whose preview plays behind the banner; empty uses the first film.
  featured_video_id text references public.videos (id) on delete set null,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists videos_touch on public.videos;
create trigger videos_touch before update on public.videos
  for each row execute function public.touch_updated_at();

drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

alter table public.videos enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public can read visible videos" on public.videos;
create policy "Public can read visible videos" on public.videos
  for select to anon, authenticated using (visible);

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings" on public.site_settings
  for select to anon, authenticated using (true);
