# Migration `20200727182922-init-fix`

This migration has been generated by Alexandre at 7/27/2020, 6:29:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200716190825-init..20200727182922-init-fix
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource postgresql {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,9 +15,9 @@
   firstname String 
   lastname String
   email String   @unique
   phone String?
-  interests Cause[]
+  interests Cause[] @relation(name: "Interests")
   socialNetwork SocialNetwork? 
 }
 model Cause{
```

