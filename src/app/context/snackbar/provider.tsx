import React, { ReactNode, useContext, useReducer } from 'react'
import Context from './context'

export const ALTER_SUCCESS = 'success'
export const ALTER_INFO = 'info'
export const ALTER_WARNING = 'warning'
export const ALTER_ERROR = 'error'
export const DURATION = 5000

const initialState = {
  open: false,
  type: ALTER_SUCCESS,
  duration: DURATION,
  message: null
}

const reducer = (state: any, action: any) => {
  if (action.type === 'open') {
    const { payload } = action
    return { ...state, type: ALTER_SUCCESS, ...payload, open: true }
  }

  if (action.type === 'close') {
    return { ...state, open: false }
  }

  return state
}

export const useSnackbar = () => {
  const { handleOpen } = useContext(Context) as any
  return handleOpen
}

export function Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOpen = (payload: any) => {
    dispatch({ type: 'open', payload })
  }

  const handleClose = () => {
    dispatch({ type: 'close' })
  }

  return (
    <Context.Provider value={{ handleOpen, handleClose }}>
      {children}

      {/* Tailwind-based Snackbar */}
      {state.open && (
        <div
          className={`fixed bottom-4 left-1/2 w-full max-w-xs -translate-x-1/2 transform rounded-lg p-4 shadow-lg transition-opacity duration-300 ${
            state.type === ALTER_SUCCESS
              ? 'bg-green-600'
              : state.type === ALTER_INFO
                ? 'bg-blue-600'
                : state.type === ALTER_WARNING
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
          }`}
          style={{ animation: `fadeIn 0.3s ease-in-out` }}>
          <div className="flex items-center justify-between text-white">
            <div className="flex-1">{state.message}</div>
            <button onClick={handleClose} className="ml-4 text-white focus:outline-none">
              <span className="text-xl">&times;</span>
            </button>
          </div>
        </div>
      )}

      {/* Automatically close snackbar after duration */}
      {state.open && setTimeout(handleClose, state.duration)}
    </Context.Provider>
  )
}

export default Provider
