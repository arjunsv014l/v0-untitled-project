-- Add marketing_consent column to profiles table
ALTER TABLE "profiles" 
ADD COLUMN IF NOT EXISTS "marketing_consent" BOOLEAN DEFAULT FALSE;
