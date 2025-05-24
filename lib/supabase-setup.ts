import { supabase } from "@/lib/supabase"

// Function to set up the necessary tables and functions in Supabase
export async function setupSupabaseDatabase() {
  try {
    console.log("Setting up Supabase database...")

    // Check if the profiles table exists
    const { data: profilesExists, error: profilesCheckError } = await supabase.from("profiles").select("id").limit(1)

    if (profilesCheckError && profilesCheckError.code !== "PGRST116") {
      // Create profiles table
      const createProfilesSQL = `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          name TEXT,
          email TEXT UNIQUE,
          role TEXT DEFAULT 'student',
          bio TEXT,
          avatar_url TEXT,
          dob TEXT,
          college TEXT,
          major TEXT,
          graduation_year TEXT,
          location TEXT,
          interests TEXT,
          social_links JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      // Execute SQL via RPC (requires a custom function to be set up in Supabase)
      const { error: createProfilesError } = await supabase.rpc("execute_sql", { sql: createProfilesSQL })

      if (createProfilesError) {
        console.error("Error creating profiles table:", createProfilesError)
      } else {
        console.log("✅ Profiles table created successfully")
      }
    } else {
      console.log("✅ Profiles table already exists")
    }

    // Check if the registrations table exists
    const { data: registrationsExists, error: registrationsCheckError } = await supabase
      .from("registrations")
      .select("id")
      .limit(1)

    if (registrationsCheckError && registrationsCheckError.code !== "PGRST116") {
      // Create registrations table
      const createRegistrationsSQL = `
        CREATE TABLE IF NOT EXISTS registrations (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL,
          name TEXT,
          dob TEXT,
          registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          status TEXT DEFAULT 'pending',
          completed_profile BOOLEAN DEFAULT FALSE,
          source TEXT DEFAULT 'email',
          referrer TEXT,
          notes TEXT,
          metadata JSONB
        );
      `

      // Execute SQL via RPC
      const { error: createRegistrationsError } = await supabase.rpc("execute_sql", { sql: createRegistrationsSQL })

      if (createRegistrationsError) {
        console.error("Error creating registrations table:", createRegistrationsError)
      } else {
        console.log("✅ Registrations table created successfully")
      }
    } else {
      console.log("✅ Registrations table already exists")
    }

    // Check if the stats table exists
    const { data: statsExists, error: statsCheckError } = await supabase
      .from("stats")
      .select("name")
      .eq("name", "user_counter")
      .limit(1)

    if (statsCheckError && statsCheckError.code !== "PGRST116") {
      // Create stats table
      const createStatsSQL = `
        CREATE TABLE IF NOT EXISTS stats (
          name TEXT PRIMARY KEY,
          count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `

      // Execute SQL via RPC
      const { error: createStatsError } = await supabase.rpc("execute_sql", { sql: createStatsSQL })

      if (createStatsError) {
        console.error("Error creating stats table:", createStatsError)
      } else {
        console.log("✅ Stats table created successfully")

        // Insert initial user counter
        const { error: insertCounterError } = await supabase.from("stats").insert({ name: "user_counter", count: 500 })

        if (insertCounterError) {
          console.error("Error inserting initial user counter:", insertCounterError)
        } else {
          console.log("✅ Initial user counter created successfully")
        }
      }
    } else if (!statsExists || statsExists.length === 0) {
      // Insert user counter if it doesn't exist
      const { error: insertCounterError } = await supabase.from("stats").insert({ name: "user_counter", count: 500 })

      if (insertCounterError) {
        console.error("Error inserting initial user counter:", insertCounterError)
      } else {
        console.log("✅ Initial user counter created successfully")
      }
    } else {
      console.log("✅ Stats table and user counter already exist")
    }

    // Create function for incrementing user count
    const createIncrementFunctionSQL = `
      CREATE OR REPLACE FUNCTION increment_user_count()
      RETURNS INTEGER
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        new_count INTEGER;
      BEGIN
        UPDATE stats
        SET count = count + 1,
            updated_at = NOW()
        WHERE name = 'user_counter'
        RETURNING count INTO new_count;
        
        IF new_count IS NULL THEN
          INSERT INTO stats (name, count)
          VALUES ('user_counter', 501)
          RETURNING count INTO new_count;
        END IF;
        
        RETURN new_count;
      END;
      $$;
    `

    // Execute SQL via RPC
    const { error: createFunctionError } = await supabase.rpc("execute_sql", { sql: createIncrementFunctionSQL })

    if (createFunctionError) {
      console.error("Error creating increment_user_count function:", createFunctionError)
    } else {
      console.log("✅ increment_user_count function created successfully")
    }

    // Create function for incrementing user count by a specific amount
    const createIncrementByFunctionSQL = `
      CREATE OR REPLACE FUNCTION increment_user_count_by(increment_amount INTEGER)
      RETURNS INTEGER
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        new_count INTEGER;
      BEGIN
        UPDATE stats
        SET count = count + increment_amount,
            updated_at = NOW()
        WHERE name = 'user_counter'
        RETURNING count INTO new_count;
        
        IF new_count IS NULL THEN
          INSERT INTO stats (name, count)
          VALUES ('user_counter', 500 + increment_amount)
          RETURNING count INTO new_count;
        END IF;
        
        RETURN new_count;
      END;
      $$;
    `

    // Execute SQL via RPC
    const { error: createIncrementByFunctionError } = await supabase.rpc("execute_sql", {
      sql: createIncrementByFunctionSQL,
    })

    if (createIncrementByFunctionError) {
      console.error("Error creating increment_user_count_by function:", createIncrementByFunctionError)
    } else {
      console.log("✅ increment_user_count_by function created successfully")
    }

    return { success: true, message: "Supabase database setup completed successfully" }
  } catch (error) {
    console.error("Error setting up Supabase database:", error)
    return { success: false, error }
  }
}
