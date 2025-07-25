// src/app/routing/AppRouter.tsx
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from './routeConfig'
import Loading from 'shared/ui/Loading'

const HomePage = lazy(() => import('pages/app/home'))
const UsersPage = lazy(() => import('pages/app/posts'))

export const AppRouter = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.POSTS} element={<UsersPage />} />
      </Routes>
    </Suspense>
  )
}
