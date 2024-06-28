import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import type { User } from "@shared/types";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance, getJWTHeader } from "@/axiosInstance";
import { generateUserKey } from "@/react-query/key-factories";
import { queryKeys } from "@/react-query/constants";

async function getUser(userId: number, userToken: string) {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${userId}`,
    {
      headers: getJWTHeader(userToken),
    }
  );

  return data.user;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token),
      newUser
    );
  }

  function clearUser() {
    queryClient.removeQueries({
      queryKey: [queryKeys.user],
    });
  }

  return { user, updateUser, clearUser };
}
