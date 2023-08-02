import fs from 'fs'
import path from 'path'

export default function findUser(userName: string) {
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
