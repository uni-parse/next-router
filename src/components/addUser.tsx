'use client'

import { useState } from 'react'

export default function AddUser({ setUsers }: any) {
  const [name, setName] = useState('')
  const [money, setMoney] = useState('' as '' | number)
  const [xp, setXp] = useState('' as '' | number)
  const [output, setOutput] = useState('waiting...')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, money, xp }),
    })

    const { message, users } = await res.json()
    setOutput(message)

    setName('')
    setMoney('')
    setXp('')

    setUsers(users)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>add user:</h3>
      <input
        type='text'
        placeholder='name'
        value={name}
        onChange={e => setName(e.target.value)}
        required
        pattern='\w{5,8}'
        title='enter 5~8 characters: a~z or 0~9 or _'
      />
      <br />

      <input
        type='number'
        placeholder='money'
        value={money}
        onChange={e => {
          const { value } = e.target
          setMoney(value ? +value : '')
        }}
        required
        pattern='\d+'
        title='enter one digit or more'
      />
      <br />

      <input
        type='number'
        placeholder='xp'
        value={xp}
        onChange={e => {
          const { value } = e.target
          setXp(value ? +value : '')
        }}
        required
        pattern='\d+'
        title='enter one digit or more'
      />
      <br />

      <input type='submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}
