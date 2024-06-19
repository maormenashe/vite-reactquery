import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { useQuery } from "@tanstack/react-query";
import type { Treatment } from "@shared/types";

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get("/treatments");
  return data;
}

export function useTreatments() {
  return useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
  });
}
