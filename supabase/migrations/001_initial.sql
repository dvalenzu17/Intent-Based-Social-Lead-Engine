create table if not exists keyword_sets (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  keywords text[] not null,
  created_at timestamptz default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  external_id text not null,
  title text,
  body text,
  url text,
  author text,
  subreddit text,
  created_at timestamptz,
  ingested_at timestamptz default now(),
  unique(source, external_id)
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id),
  product text not null,
  intent_score int not null,
  intent_type text not null,
  status text not null default 'new',
  scored_at timestamptz default now()
);

-- Seed keyword sets
insert into keyword_sets (product_name, keywords) values
('statjot', array['GA4 alternative','Google Analytics alternative','privacy analytics','Plausible Analytics','cookie free analytics','analytics indie','analytics startup']),
('beforeitbills', array['subscription tracker','cancel subscriptions','manage subscriptions','subscription management','recurring charges'])
on conflict do nothing;
