import fs from 'fs'
import path from 'path'

const usersPath = path.join(process.cwd(), 'db', 'users.json')

interface User {
  name: string
  money: number
  xp: number
}

export default async function UsersSSR() {
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users: User[] = JSON.parse(usersJson)

  const date = new Date()

  return (
    <section className='mt-4 rounded-lg bg-[#222] p-2'>
      <h1 className='text-center'>Server Side Rendered</h1>
      <div className='mb-2 rounded-xl bg-cyan-900 p-2'>
        <h3>users snapshot (on demand):</h3>
        <p>
          updated on each request (reload):
          <br />
          last update:{' '}
          <time dateTime={date.toISOString()}>
            {date.toLocaleTimeString()}
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
