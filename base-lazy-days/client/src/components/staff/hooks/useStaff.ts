import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { Staff } from "@shared/types";

import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  const [filter, setFilter] = useState("all");

  const selectFilteredStaff = useCallback(
    (staff: Staff[]) => {
      if (filter === "all") return staff;

      return filterByTreatment(staff, filter);
    },
    [filter]
  );

  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFilteredStaff,
  });

  return { staff, filter, setFilter };
}
