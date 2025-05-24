-- Add is_profile_complete column to profiles table if it doesn't exist
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "is_profile_complete" BOOLEAN DEFAULT FALSE;

-- Add privacy_settings and profile_visibility columns
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "privacy_settings" JSONB DEFAULT '{"showEmail": false, "showLocation": true, "allowTagging": true, "allowMessaging": true}';

ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "profile_visibility" TEXT DEFAULT 'public';

-- Add skills column
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "skills" TEXT[];
