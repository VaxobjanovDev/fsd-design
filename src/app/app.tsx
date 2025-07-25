import { Provider as SnackbarProvider } from 'app/context/snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'shared/lib/i18n'
import { AppRouter } from 'app/routing/AppRouter'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from 'app/context/theme'

function App() {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
