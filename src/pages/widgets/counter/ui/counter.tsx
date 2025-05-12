import { useCounter } from '../model/useCounter'

export const Counter = () => {
  const { count, increment } = useCounter()

  return (
    <div className="card">
      <button onClick={increment}>count is {count}</button>
    </div>
  )
}
