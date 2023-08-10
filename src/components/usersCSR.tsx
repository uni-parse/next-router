'use client'

import { useState } from 'react'
import AddUser from '@/components/addUser'
import DeleteUser from '@/components/deleteUser'
import GetUser from '@/components/getUser'
import GetUsers from '@/components/getUsers'
import RequastAccess from './requestAccess'

interface User {
  name: string
  money: number
  xp: number
}

export default function UsersCSR() {
  const [users, setUsers] = useState(null as null | User[])
  const [unlock, setUnlock] = useState(false)

  return (
    <section className='mt-4 rounded-lg bg-[#222] p-2'>
      <h1 className='text-center'>Client Side Rendered</h1>

      {unlock ? (
        <RequastAccess setUnlock={setUnlock} />
      ) : (
        <>
          <GetUsers users={users} />
          <GetUser />
          <AddUser setUsers={setUsers} />
          <DeleteUser setUsers={setUsers} />
        </>
      )}
    </section>
  )
}
