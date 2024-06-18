export const peopleQueryKeys = {
  all: ["people"] as const,
  infinite: () => [...peopleQueryKeys.all, "infinite"] as const,
};
