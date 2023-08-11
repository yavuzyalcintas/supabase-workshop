import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function logout(client: SupabaseClient) {
  return client.auth.signOut();
}

function useLogout() {
  const client = useSupabase();
  const key = ["logout"];

  return useMutation(key, async () => {
    return logout(client).then((result) => result.error);
  });
}

export default useLogout;
