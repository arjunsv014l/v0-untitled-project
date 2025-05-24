-- Create a stats table if it doesn't exist
CREATE TABLE IF NOT EXISTS stats (
  name TEXT PRIMARY KEY,
  count INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the initial counter value if it doesn't exist
INSERT INTO stats (name, count)
VALUES ('user_counter', 500)
ON CONFLICT (name) DO NOTHING;

-- Create a function to reconcile the counter with the actual registration count
CREATE OR REPLACE FUNCTION reconcile_user_counter()
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  registration_count integer;
  current_counter integer;
  correct_count integer;
BEGIN
  -- Get the count of registrations
  SELECT COUNT(*) INTO registration_count FROM registrations;
  
  -- Calculate the correct count (base + registrations)
  correct_count := 500 + registration_count;
  
  -- Get the current counter value
  SELECT count INTO current_counter FROM stats WHERE name = 'user_counter';
  
  -- If the counter is out of sync, update it
  IF current_counter != correct_count THEN
    UPDATE stats 
    SET count = correct_count, updated_at = NOW() 
    WHERE name = 'user_counter';
  END IF;
  
  -- Return the correct count
  RETURN correct_count;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION reconcile_user_counter() TO authenticated;
