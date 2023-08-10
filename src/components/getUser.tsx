'use client'

import { useState } from 'react'
import UserComponent from './userComponent'

export default function GetUser() {
  const [userName, setUserName] = useState('')

  return (
    <div className='my-2 rounded-xl bg-cyan-900 p-2'>
      <h3>get user:</h3>
      <input
        type='text'
        placeholder='name'
        onChange={e => setUserName(e.target.value)}
      />

      {userName ? (
        <UserComponent name={userName} />
      ) : (
        <p>waiting...</p>
      )}
    </div>
  )
}
