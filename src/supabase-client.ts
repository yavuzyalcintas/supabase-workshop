import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_URL!,
    import.meta.env.VITE_SUPABASE_ANON!
  );
}
