-- Check if the is_profile_complete column exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'is_profile_complete'
    ) THEN
        -- Add the is_profile_complete column if it doesn't exist
        ALTER TABLE profiles ADD COLUMN is_profile_complete BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Update any existing profiles to have is_profile_complete set to false if null
UPDATE profiles 
SET is_profile_complete = FALSE 
WHERE is_profile_complete IS NULL;

-- Create an index on the is_profile_complete column for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_is_complete ON profiles(is_profile_complete);

-- Show the current schema of the profiles table
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;
