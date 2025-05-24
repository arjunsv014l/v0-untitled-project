-- Create the atomic user registration function
CREATE OR REPLACE FUNCTION atomic_user_registration(
  p_email TEXT,
  p_password TEXT,
  p_name TEXT,
  p_dob DATE DEFAULT NULL,
  p_avatar_url TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_result JSON;
BEGIN
  -- Create the auth user
  INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  )
  VALUES (
    gen_random_uuid(),
    p_email,
    crypt(p_password, gen_salt('bf')),
    NOW(),
    jsonb_build_object('name', p_name, 'dob', p_dob),
    NOW(),
    NOW()
  )
  RETURNING id INTO v_user_id;

  -- Create the profile
  INSERT INTO public.profiles (
    id,
    name,
    email,
    role,
    dob,
    avatar_url,
    created_at,
    last_login
  )
  VALUES (
    v_user_id,
    p_name,
    p_email,
    'student',
    p_dob,
    p_avatar_url,
    NOW(),
    NOW()
  );

  -- Create registration record
  INSERT INTO public.registrations (
    user_id,
    email,
    name,
    dob,
    registered_at,
    status,
    completed_profile,
    source
  )
  VALUES (
    v_user_id,
    p_email,
    p_name,
    p_dob,
    NOW(),
    'active',
    false,
    'website'
  );

  -- Create user settings
  INSERT INTO public.user_settings (
    user_id,
    theme,
    notifications_enabled,
    email_notifications,
    created_at,
    updated_at
  )
  VALUES (
    v_user_id,
    'light',
    true,
    true,
    NOW(),
    NOW()
  );

  -- Return success with user ID
  v_result := json_build_object(
    'success', true,
    'user_id', v_user_id
  );
  
  RETURN v_result;

EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'A user with this email already exists';
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Registration failed: %', SQLERRM;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION atomic_user_registration TO service_role;
