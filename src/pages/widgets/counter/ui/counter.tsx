import { useCounter } from '../model/useCounter'

export const Counter = () => {
  const { count, increment } = useCounter()

  return (
    <button className="my-2 cursor-pointer rounded-xl bg-black/50 p-2 text-red-900" onClick={increment}>
      count is {count}
    </button>
  )
}
