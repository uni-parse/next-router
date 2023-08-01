'use client'

// redirect to this page condition:
// unHandled server page errors at run Time
// not unHandled client pages errors at run Time

import { useState } from 'react'

export default function Page() {
  const [message, setMessage] = useState('')

  return (
    <>
      <h1 className='text-center'>Testing error</h1>

      <div className='flex justify-center'>
        <input
          type='text'
          placeholder='error message'
          onChange={e => setMessage(e.target.value)}
        />
        <button
          type='button'
          onClick={() => {
            setMessage('')
            throw Error(message)
          }}>
          throw Error
        </button>
      </div>
    </>
  )
}
