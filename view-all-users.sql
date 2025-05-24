-- View all user profiles with their registration info
SELECT 
  p.*,
  r.registered_at,
  r.status as registration_status,
  r.source as registration_source
FROM profiles p
LEFT JOIN registrations r ON p.id = r.user_id
ORDER BY p.created_at DESC;
