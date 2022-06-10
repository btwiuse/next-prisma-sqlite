import type { User } from "@prisma/client";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

const fetcher = (...args: [key: string]) =>
  fetch(...args).then((res) => res.json());

export const useUsers = (url: string, config: SWRConfiguration = {}) => {
  const { data, error, mutate } = useSWR<User[]>(`/api${url}`, fetcher, config);

  return {
    users: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
