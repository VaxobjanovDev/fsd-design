import { HomePage } from 'pages/app/home'
import { Provider as SnackbarProvider } from 'app/context/snackbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PostsPage } from 'pages/app/posts'
import 'shared/lib/i18n'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <PostsPage />
      </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
