import fs from 'fs'
import path from 'path'

interface PageProps {
  params: {
    userName: string
  }
}

export default async function Page({ params: { userName } }: PageProps) {

  const user = findUser(userName)

  if (!user)
    return (
      <h1 className='text-center'>
        UnDefined User: {userName}
      </h1>
    )

  const { name, money, xp } = user
  return (
    <>
      <h1 className='text-center'>Hello {name} !!</h1>

      <h3>your status:</h3>
      <ul>
        <li>money: {money}$</li>
        <li>xp: {xp}</li>
      </ul>
    </>
  )
}

function findUser(userName:string) {
  const usersPath = path.join(process.cwd(), 'db', 'users.json')
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users = JSON.parse(usersJson)

  type User = {
    name: string
    money: number
    xp: number
  }

  const user: User | undefined = users.find(
    (user: User) => user.name === userName
  )
  return user
}
