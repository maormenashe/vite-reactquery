export const speciesQueryKeys = {
  all: ["species"] as const,
  infinite: () => [...speciesQueryKeys.all, "infinite"] as const,
};
