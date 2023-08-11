import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function getTodos(client: SupabaseClient) {
  return client.from("todos").select("*").throwOnError();
}

function useGetTodos() {
  const client = useSupabase();
  const key = ["todos"];

  return useQuery(
    key,
    async () => {
      return getTodos(client).then((result) => result.data);
    },
    {
      cacheTime: 0,
      staleTime: 0,
    }
  );
}

export default useGetTodos;
