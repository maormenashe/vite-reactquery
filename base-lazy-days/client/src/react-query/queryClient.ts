import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientConfig,
} from "@tanstack/react-query";

import { toast } from "@/components/app/toast";

function createTitle(errorMsg: string, actionType: "query" | "mutation") {
  const action = actionType === "query" ? "fetch" : "update";
  return `could not ${action} data: ${
    errorMsg ?? "error connecting to server"
  }`;
}

function errorHandler(title: string) {
  const id = "react-query-toast";

  if (!toast.isActive(id)) {
    toast({ id, title, status: "error", variant: "subtle", isClosable: true });
  }
}

export const queryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
  queryCache: new QueryCache({
    onError(error, query) {
      const errorTitle = createTitle(error.message, "query");
      errorHandler(errorTitle);
    },
  }),
  mutationCache: new MutationCache({
    onError(error, variables, context, mutation) {
      const errorTitle = createTitle(error.message, "mutation");
      errorHandler(errorTitle);
    },
  }),
};

export const queryClient = new QueryClient(queryClientOptions);
