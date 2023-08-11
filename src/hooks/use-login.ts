import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function login(client: SupabaseClient, email: string) {
  return client.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: "http://localhost:5173",
    },
  });
}

function useLogin() {
  const client = useSupabase();
  const key = ["login"];

  return useMutation(key, async (email: string) => {
    return login(client, email).then((result) => result.data);
  });
}

export default useLogin;
