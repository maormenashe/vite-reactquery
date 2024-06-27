import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

import { AppointmentDateMap } from "../types";
import { getAvailableAppointments } from "../utils";
import { getMonthYearDetails, getNewMonthYear } from "./monthYear";

import { useLoginData } from "@/auth/AuthContext";
import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// for useQuery call
async function getAppointments(
  year: string,
  month: string
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`);
  return data;
}

export function useAppointments() {
  const currentMonthYear = getMonthYearDetails(dayjs());

  const [monthYear, setMonthYear] = useState(currentMonthYear);

  function updateMonthYear(monthIncrement: number): void {
    setMonthYear((prevData) => getNewMonthYear(prevData, monthIncrement));
  }

  const [showAll, setShowAll] = useState(false);

  const { userId } = useLoginData();

  const selectFn = useCallback(
    (data: AppointmentDateMap, showAll: boolean) => {
      if (showAll) return data;

      return getAvailableAppointments(data, userId);
    },
    [userId]
  );

  const fallback: AppointmentDateMap = {};
  const { data: appointments } = useQuery({
    queryKey: [queryKeys.appointments, monthYear.year, monthYear.month],
    initialData: fallback,
    queryFn: () => getAppointments(monthYear.year, monthYear.month),
    select: (data) => selectFn(data, showAll),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  const queryClient = useQueryClient();
  useEffect(() => {
    const nextMonthYear = getNewMonthYear(monthYear, 1);
    queryClient.prefetchQuery({
      queryKey: [
        queryKeys.appointments,
        nextMonthYear.year,
        nextMonthYear.month,
      ],
      queryFn: () => getAppointments(nextMonthYear.year, nextMonthYear.month),
      staleTime: 0,
      gcTime: 5 * 60 * 1000,
    });
  }, [monthYear, queryClient]);

  return { appointments, monthYear, updateMonthYear, showAll, setShowAll };
}
