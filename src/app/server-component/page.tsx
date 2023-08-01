import fs from 'fs'
import path from 'path'
import util from 'util'

// same as fs.readFileSync(), we do that to just to test async
const readFile = util.promisify(fs.readFile)
const wait = (ms: number) =>
  new Promise(rs => setTimeout(rs, ms))

const page = async () => {
  // throw error when server are offline.
  const currentHour = new Date().getHours()
  if (currentHour > 22 && currentHour < 5)
    throw Error(
      'come back later, server are offline from 22:00 to 05:00'
    )

  const usersPath = path.join(process.cwd(), 'db', 'users.json')
  const usersJson = await readFile(usersPath, 'utf8')
  const users = JSON.parse(usersJson)

  // pretending that the server are busy
  await wait(2000)

  console.log(`we have ${users.length} users`)

  type User = {
    name: string
    money: number
    xp: number
  }

  return (
    <>
      <h1 className='text-center'>server Component</h1>

      <h2>users:</h2>
      <ul>
        {users.map(({ name, money, xp }: User) => (
          <li key={name}>
            {name} have {money}$, and {xp}xp
          </li>
        ))}
      </ul>
    </>
  )
}

export default page
