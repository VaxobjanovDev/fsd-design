import React, { useMemo } from 'react'

const quotes = [
  {
    text: 'The unexamined life is not worth living.',
    author: 'Socrates'
  },
  {
    text: 'Happiness is not something ready-made. It comes from your own actions.',
    author: 'Dalai Lama'
  },
  {
    text: 'He who opens a school door, closes a prison.',
    author: 'Victor Hugo'
  },
  {
    text: 'Knowing yourself is the beginning of all wisdom.',
    author: 'Aristotle'
  },
  {
    text: 'Man is condemned to be free.',
    author: 'Jean-Paul Sartre'
  },
  {
    text: 'One cannot step twice in the same river.',
    author: 'Heraclitus'
  }
]

const Loading: React.FC = () => {
  const randomQuote = useMemo(() => {
    const index = Math.floor(Math.random() * quotes.length)
    return quotes[index]
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-xl rounded-xl bg-white p-6 text-center shadow-md transition-all duration-500">
        <p className="mb-3 text-xl font-semibold text-gray-700 italic">“{randomQuote.text}”</p>
        <p className="text-sm font-medium text-gray-500">— {randomQuote.author}</p>
      </div>
    </div>
  )
}

export default Loading
