import { supabase } from "@/lib/supabase"

// Error handling wrapper
const handleSupabaseError = (error: any, operation: string) => {
  console.error(`Supabase ${operation} error:`, error)

  // Check for permission errors
  if (error.code === "PGRST301") {
    console.error("Permission denied. Check Supabase RLS policies.")
    return { error: "Permission denied. Please contact support." }
  }

  return { error: `An error occurred during ${operation}. Please try again.` }
}

// Get a document with error handling
export const getDocument = async (table: string, id: string) => {
  try {
    const { data, error } = await supabase.from(table).select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return { data: null, error: "Document not found" }
      }
      throw error
    }

    return { data: { id, ...data }, error: null }
  } catch (error) {
    return handleSupabaseError(error, "get")
  }
}

// Create a document with error handling
export const createDocument = async (table: string, id: string | null, data: any) => {
  try {
    const timestamp = new Date().toISOString()
    const documentData = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    }

    if (id) {
      // Create with specific ID
      documentData.id = id
    }

    const { data: result, error } = await supabase.from(table).insert(documentData).select().single()

    if (error) throw error

    return { id: result.id, error: null }
  } catch (error) {
    return handleSupabaseError(error, "create")
  }
}

// Update a document with error handling
export const updateDocument = async (table: string, id: string, data: any) => {
  try {
    const { error } = await supabase
      .from(table)
      .update({
        ...data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return handleSupabaseError(error, "update")
  }
}

// Delete a document with error handling
export const deleteDocument = async (table: string, id: string) => {
  try {
    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) throw error

    return { success: true, error: null }
  } catch (error) {
    return handleSupabaseError(error, "delete")
  }
}

// Query documents with error handling
export const queryDocuments = async (table: string, fieldPath: string, operator: string, value: any) => {
  try {
    let query = supabase.from(table).select("*")

    // Map operators to Supabase
    switch (operator) {
      case "==":
        query = query.eq(fieldPath, value)
        break
      case "!=":
        query = query.neq(fieldPath, value)
        break
      case ">":
        query = query.gt(fieldPath, value)
        break
      case ">=":
        query = query.gte(fieldPath, value)
        break
      case "<":
        query = query.lt(fieldPath, value)
        break
      case "<=":
        query = query.lte(fieldPath, value)
        break
      default:
        throw new Error(`Unsupported operator: ${operator}`)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    return handleSupabaseError(error, "query")
  }
}

// Create or update user profile
export const saveUserProfile = async (userId: string, userData: any) => {
  try {
    // Check if profile exists
    const { data } = await supabase.from("profiles").select("id").eq("id", userId).single()

    const timestamp = new Date().toISOString()

    if (data) {
      // Update existing profile
      const { error } = await supabase
        .from("profiles")
        .update({
          ...userData,
          updated_at: timestamp,
        })
        .eq("id", userId)

      if (error) throw error
    } else {
      // Create new profile
      const { error } = await supabase.from("profiles").insert({
        id: userId,
        ...userData,
        created_at: timestamp,
        updated_at: timestamp,
      })

      if (error) throw error
    }

    return { success: true, error: null }
  } catch (error) {
    return handleSupabaseError(error, "save user profile")
  }
}
