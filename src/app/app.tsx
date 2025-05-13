import { HomePage } from 'pages/app/home'
import { Provider as SnackbarProvider } from 'app/context/snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <HomePage />
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
