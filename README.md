# 🤓 Example Next.js app with Supbase

Live preview [💁‍♂️ Orders lists](https://supabase-playground-eight.vercel.app/)

## 🚛 Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/jodator/supabase-playground&integration-ids=oac_jUduyjQgOyzev1fjrW83NYOv)

This repo requires [Supabase](https://supabase.com/docs) integration enabled in Vercel.

## 🧑‍💻 How to hack

Install dependencies using [PNPM](https://nextjs.org/docss) (or any other package manager)

```bash
pnpm i
```

Use standard [Next.js](https://nextjs.org/docs) scripts:

```bash
pnpm dev
```
On blank Supabase project you'd need to run Prisma migration to start:

```bash
pnpx prisma migrate dev --name item --skip-generate
```

A missing step in Prisma setup is to create a `auth.users` [view with schema](https://www.prisma.io/docs/concepts/components/prisma-schema/views#add-views-to-your-prisma-schema). Without this view you can't read from internal `auth.users` table. 
For now, you can execute this in supabase dashboard:

```postgresql
create view users as select * from auth.users
```

Then you're good to sync the supabase types:

```bash
pnpx supabase gen types typescript --linked > database.types.ts
```

### 📝 Notes

If you reset the Supabase DB using Prisma you'd need to [bring back default privileges](https://supabase.com/docs/guides/integrations/prisma#troubleshooting):

```postgresql
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;
```