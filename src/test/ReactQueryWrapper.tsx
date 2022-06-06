import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface Props {
  children: ReactElement;
}

function ReactQueryWrapper({ children }: Props): ReactElement {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryWrapper;
