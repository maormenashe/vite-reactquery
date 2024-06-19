import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";
import { Staff } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  // TODO: get data from server via useQuery
  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  });

  return { staff, filter, setFilter };
}
