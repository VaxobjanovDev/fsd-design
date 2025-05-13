import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const useAllSearchParams = () => {
  const location = useLocation()

  return useMemo(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    const params: Record<string, string> = {}

    urlSearchParams.forEach((value, key) => {
      params[key] = value
    })

    return params
  }, [location.search])
}

export default useAllSearchParams
