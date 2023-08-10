'use client'

import { useState } from 'react'

export default function RequastAccess({ setUnlock }: any) {
  const [pw, setPw] = useState('')
  const [message, setMessage] = useState('waiting...')
  const [access, setAccess] = useState(false)

  return (
    <section className='rounded-xl bg-cyan-900 p-2'>
      <h1>Request Edit Access:</h1>

      <p>{message}</p>

      {access ? (
        <button type='button' onClick={() => setUnlock(true)}>
          unlock
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={pw}
            placeholder='password'
            onChange={e => setPw(e.target.value)}
            required
          />

          <input type='submit' />
        </form>
      )}
    </section>
  )

  async function handleSubmit(e: any) {
    e.preventDefault()

    setPw('')

    const res = await fetch(`/api/authAdmin?pw=${pw}`, {
      method: 'GET',
    })
    
    const { message } = await res.json()
    setMessage(message)

    if (res.status === 200) setAccess(true)
  }
}
