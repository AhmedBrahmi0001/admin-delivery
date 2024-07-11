import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollTop from 'components/ScrollTop';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: true,
        refetchOnWindowFocus: false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeCustomization>
        <ScrollTop>
          <RouterProvider router={router} />
        </ScrollTop>
      </ThemeCustomization>
    </QueryClientProvider>
  );
}
