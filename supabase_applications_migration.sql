-- ============================================================
-- Migración: tabla applications + bucket Storage para CVs
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- 1. Tabla applications
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_title text not null,
  company text not null,
  name text not null,
  email text not null,
  phone text,
  message text,
  cv_url text,
  cv_filename text,
  submitted_at timestamptz not null default now(),
  read boolean not null default false
);

-- 2. RLS
alter table applications enable row level security;

-- Solo admins pueden leer y gestionar postulaciones
create policy "Admin read applications"
  on applications for select
  using (get_my_role() = 'admin');

create policy "Admin insert applications"
  on applications for insert
  with check (get_my_role() = 'admin');

create policy "Admin update applications"
  on applications for update
  using (get_my_role() = 'admin');

create policy "Admin delete applications"
  on applications for delete
  using (get_my_role() = 'admin');

-- Permitir inserts desde service role (API serverless)
create policy "Service role insert applications"
  on applications for insert
  with check (true);

-- 3. Storage bucket para CVs
insert into storage.buckets (id, name, public)
values ('applications', 'applications', false)
on conflict (id) do nothing;

-- Solo admins pueden leer los CVs
create policy "Admin read CVs"
  on storage.objects for select
  using (bucket_id = 'applications' and get_my_role() = 'admin');

-- Service role puede subir CVs (desde la API)
create policy "Service role upload CVs"
  on storage.objects for insert
  with check (bucket_id = 'applications');
