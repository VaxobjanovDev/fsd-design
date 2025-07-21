import reactLogo from 'shared/assets/logos/react.svg'
import viteLogo from 'shared/assets/logos/vite.svg'
import { Logo } from 'shared/ui/logo'
import { Counter } from 'widgets/counter/ui/counter'
import React from 'react'

export const HomePage = () => (
  <>
    <div className="flex items-center justify-center gap-3">
      <Logo src={viteLogo} alt="Vite logo" href="https://vite.dev" />
      <Logo src={reactLogo} alt="React logo" href="https://react.dev" className="react" />
    </div>
    <h1>Vite + React</h1>
    <Counter />
  </>
)
