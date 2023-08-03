import fs from 'fs'
import path from 'path'

interface User {
  name: string
  money: number
  xp: number
}

export default function getUsersArrRoutes() {
  const usersPath = path.join(process.cwd(), 'db', 'users.json')
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users = JSON.parse(usersJson) as User[]

  const userNames: string[] = users.map(user => user.name)

  const usersRoutes: string[][] = userNames
    .map(name => [[name], [name, 'xp'], [name, 'money']])
    .flat()

  return usersRoutes
}
