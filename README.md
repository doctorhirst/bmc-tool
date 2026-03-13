# Business Model Canvas Tool

An interactive Business Model Canvas for students — built with React, Vite, and Supabase.

## Features
- 9-block BMC canvas with AI feedback per block
- Value Proposition Canvas with fit checker
- Business model assessment (Osterwalder's 7 questions)
- Business plan generator with real company examples
- Internet resources library
- Supabase database — work saves automatically across devices
- Teacher dashboard to view all student submissions

## Live URL
Once deployed: `https://YOUR-USERNAME.github.io/bmc-tool/`

## Setup

### 1. Clone and install
```bash
git clone https://github.com/YOUR-USERNAME/bmc-tool.git
cd bmc-tool
npm install
```

### 2. Run locally
```bash
npm run dev
```
Open `http://localhost:5173/bmc-tool/`

### 3. Deploy to GitHub Pages
Push to `main` branch — GitHub Actions builds and deploys automatically.

**First-time setup:**
1. Go to your repo → **Settings → Pages**
2. Under "Source" select **GitHub Actions**
3. Push any change to `main` to trigger the first deploy

Your site will be live at `https://YOUR-USERNAME.github.io/bmc-tool/`

## Teacher access
Password: `bmc2026` (change in `src/App.jsx` → search for `TEACHER_PW`)

## Supabase
Database is pre-configured. Run this SQL once in your Supabase dashboard:

```sql
create table bmc_canvases (
  id uuid default gen_random_uuid() primary key,
  student_name text,
  biz_name text,
  canvas jsonb default '{}',
  hyps jsonb default '{}',
  vp_data jsonb default '{}',
  scores jsonb default '{}',
  plan text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table bmc_canvases enable row level security;
create policy "Anyone can insert" on bmc_canvases for insert with check (true);
create policy "Anyone can update their own" on bmc_canvases for update using (true);
create policy "Anyone can read" on bmc_canvases for select using (true);

create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger set_updated_at before update on bmc_canvases
for each row execute function update_updated_at();
```
