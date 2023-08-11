import { useMutation } from "@tanstack/react-query";
import useSupabase from "./use-supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function addTodo(client: SupabaseClient, name: string) {
  return client
    .from("todos")
    .insert({
      name: name,
    })
    .throwOnError();
}

function useAddTodo() {
  const client = useSupabase();
  const key = ["addtodo"];

  return useMutation(key, async (name: string) => {
    return addTodo(client, name).then((result) => result.data);
  });
}

export default useAddTodo;
