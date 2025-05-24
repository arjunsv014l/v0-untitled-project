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

-- Create or replace the increment function to ensure it increments by exactly 1
CREATE OR REPLACE FUNCTION increment_user_count()
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  current_count integer;
  new_count integer;
BEGIN
  -- Get the current count
  SELECT count INTO current_count FROM stats WHERE name = 'user_counter';
  
  -- Increment by exactly 1
  new_count := current_count + 1;
  
  -- Update the counter
  UPDATE stats SET count = new_count, updated_at = NOW() WHERE name = 'user_counter';
  
  -- Return the new count
  RETURN new_count;
END;
$$;

-- Create a function to increment by a specific amount (for batch operations)
CREATE OR REPLACE FUNCTION increment_user_count_by(increment_amount integer)
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  current_count integer;
  new_count integer;
BEGIN
  -- Get the current count
  SELECT count INTO current_count FROM stats WHERE name = 'user_counter';
  
  -- Increment by the specified amount
  new_count := current_count + increment_amount;
  
  -- Update the counter
  UPDATE stats SET count = new_count, updated_at = NOW() WHERE name = 'user_counter';
  
  -- Return the new count
  RETURN new_count;
END;
$$;

-- Create a function to get the current count
CREATE OR REPLACE FUNCTION get_user_count()
RETURNS integer
LANGUAGE plpgsql
AS $$
DECLARE
  current_count integer;
BEGIN
  -- Get the current count
  SELECT count INTO current_count FROM stats WHERE name = 'user_counter';
  
  -- Return the current count
  RETURN current_count;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION increment_user_count() TO authenticated;
GRANT EXECUTE ON FUNCTION increment_user_count_by(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_count() TO authenticated;
