import {
  QueryClient as Client,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { ReactQueryDevtools as Devtools } from "@tanstack/react-query-devtools";
import type { FC, ReactNode } from "react";

const client = new Client({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
    mutations: { retry: false },
  },
});

type Props = { children: ReactNode };

const QueryClientProvider: FC<Props> = ({ children }) => {
  return (
    <Provider client={client}>
      {children}
      <Devtools initialIsOpen={false} />
    </Provider>
  );
};

export default QueryClientProvider;
