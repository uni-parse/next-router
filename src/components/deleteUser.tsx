'use client'

import { useState } from 'react'

export default function DeleteUser({ setUsers }: any) {
  const [name, setName] = useState('')
  const [output, setOutput] = useState('waiting...')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch(`/api/users?userName=${name}`, {
      method: 'DELETE',
    })

    const { message, users } = await res.json()
    setOutput(message)

    setName('')
    
    setUsers(users)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>delete user:</h3>

      <input
        type='text'
        value={name}
        placeholder='userName'
        onChange={e => setName(e.target.value)}
        required
        pattern='\w{5,8}'
        title='enter 5~8 characters: a~z or 0~9 or _'
      />
      <br />

      <input type='submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}
