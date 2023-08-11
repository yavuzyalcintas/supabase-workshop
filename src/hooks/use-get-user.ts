import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function getUser(client: SupabaseClient) {
  return client.auth.getUser();
}

function useGetUser() {
  const client = useSupabase();
  const key = ["user"];

  return useQuery(key, async () => {
    return getUser(client).then((result) => result.data);
  });
}

export default useGetUser;
