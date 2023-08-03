'use client'

import useSWR from 'swr'
import { Metadata } from 'next/types'
import { useEffect, useState } from 'react'

export const metadata: Metadata = {
  title: 'Admin',
  description:
    'admin panel to configurate users.json on database',
  robots: 'noindex,nofollow',
}

interface User {
  name: string
  money: number
  xp: number
}

export default function Page() {
  const [users, setUsers] = useState(null as null | User[])
  useAuthAdmin()

  return (
    <>
      <h1 className='text-center'>Admin</h1>

      <section className='mt-4 rounded-lg bg-[#222] p-2'>
        <GetUsers users={users} />
        <GetUser />
        <AddUserForm setUsers={setUsers} />
        <DeleteUserForm setUsers={setUsers} />
      </section>
    </>
  )
}

function useAuthAdmin() {
  useEffect(() => {
    authAdmin()
  }, [])
}

async function authAdmin() {
  const pw = prompt('Enter Password', '')
  const res = await fetch(`/api/authAdmin?pw=${pw}`, {
    method: 'GET',
  })
  const { message } = await res.json()

  if (res.status === 200) alert(message)
  else {
    alert(message)
    authAdmin()
  }
}

function AddUserForm({ setUsers }: any) {
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

      <input type='submit' value='Submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}

function DeleteUserForm({ setUsers }: any) {
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

      <input type='submit' value='Submit' />
      <br />

      <output>{output}</output>
    </form>
  )
}

function GetUsers({ users }: { users: User[] | null }) {
  const { data } = useSWR('/api/users', async (url: URL) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  })

  const currentUsers: User[] = users ?? data

  return (
    <div className='rounded-xl bg-cyan-900 p-2'>
      <h3>get users:</h3>
      {currentUsers?.map((user: any) => (
        <details key={user.name}>
          <summary>{user.name}</summary>
          <ul>
            <li>money: {user.money}</li>
            <li>xp: {user.xp}</li>
          </ul>
        </details>
      ))}
    </div>
  )
}

function GetUser() {
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

function UserComponent({ name }: { name: string }) {
  const url = `/api/users?userName=${name}`

  const fetcher = async (url: URL) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const { data: user, error } = useSWR(url, fetcher)

  if (error)
    return (
      <div>
        <p>invalid userName / failed to load</p>
        <p>{error.message}</p>
      </div>
    )
  if (!user) return <div>loading...</div>
  return (
    <details>
      <summary>{user.name}</summary>
      <ul>
        <li>money: {user.money}</li>
        <li>xp: {user.xp}</li>
      </ul>
    </details>
  )
}
