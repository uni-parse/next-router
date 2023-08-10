'use client'

interface User {
  name: string
  money: number
  xp: number
}

export default function GetUsers({
  users,
}: {
  users: User[] | null
}) {
  const date = new Date()

  return (
    <div className='rounded-xl bg-cyan-900 p-2'>
      <h3>users snapshot (on edite):</h3>

      <p>
        updated on each edite (add/delete user)
        <br />
        last update:{' '}
        <time dateTime={date.toISOString()}>
          {date.toLocaleTimeString()}
        </time>
      </p>

      {!users ? (
        <p>waiting...</p>
      ) : (
        users.map((user: any) => (
          <details key={user.name}>
            <summary>{user.name}</summary>
            <ul>
              <li>money: {user.money}</li>
              <li>xp: {user.xp}</li>
            </ul>
          </details>
        ))
      )}
    </div>
  )
}
