import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function checkTodo(client: SupabaseClient, id: string) {
  return client
    .from("todos")
    .update({
      is_completed: true,
    })
    .eq("id", id)
    .throwOnError();
}

function useCheckTodo() {
  const client = useSupabase();
  const key = ["check"];

  return useMutation(key, async (id: string) => {
    return checkTodo(client, id).then((result) => result.data);
  });
}

export default useCheckTodo;
