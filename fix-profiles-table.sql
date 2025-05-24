-- Add is_profile_complete column to profiles table
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "is_profile_complete" BOOLEAN DEFAULT FALSE;

-- Add social_links column if it doesn't exist
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "social_links" JSONB DEFAULT '{}';

-- Add privacy_settings column if it doesn't exist
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "privacy_settings" JSONB DEFAULT '{"showEmail": false, "showLocation": true, "allowTagging": true, "allowMessaging": true}';

-- Add profile_visibility column if it doesn't exist
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "profile_visibility" TEXT DEFAULT 'public';

-- Add skills column if it doesn't exist
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "skills" TEXT[];
