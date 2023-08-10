/* eslint-disable react/no-unescaped-entities */
import fs from 'fs'
import path from 'path'

const usersPath = path.join(process.cwd(), 'db', 'users.json')

export default async function UsersSSG() {
  interface User {
    name: string
    money: number
    xp: number
  }

  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users: User[] = JSON.parse(usersJson)

  const date = new Date()

  return (
    <section className='mt-4 rounded-lg bg-[#222] p-2'>
      <h1 className='text-center'>Static Generated</h1>
      <div className='mb-2 rounded-xl bg-cyan-900 p-2'>
        <h3>users snapshot (static):</h3>
        <p>
          generated at build time
          <br />
          last update:{' '}
          <time dateTime={date.toISOString()}>
            {date.toLocaleString()}
          </time>
        </p>

        {users.map(user => (
          <details key={user.name}>
            <summary>{user.name}</summary>
            <ul>
              <li>money: {user.money}</li>
              <li>xp: {user.xp}</li>
            </ul>
          </details>
        ))}
      </div>
    </section>
  )
}
