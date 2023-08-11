import { useMemo } from "react";
import { getSupabaseClient } from "../supabase-client";

function useSupabase() {
  return useMemo(getSupabaseClient, []);
}

export default useSupabase;
