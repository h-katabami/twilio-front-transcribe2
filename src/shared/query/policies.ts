export const queryPolicies = {
  default: {
    retry: 1,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  },
  lowChangeData: {
    staleTime: 5 * 60 * 1000,
  },
} as const;
