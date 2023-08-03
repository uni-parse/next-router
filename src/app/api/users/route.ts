import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

const usersPath = path.join(process.cwd(), 'db', 'users.json')

interface User {
  name: string
  money: number
  xp: number
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const users = getUsers(usersPath)

  if (searchParams.has('userName')) {
    const userName = searchParams.get('userName')
    const user = users.find(user => user.name === userName)

    const data = JSON.stringify(user)
    return new Response(data, { status: 200 })
  }

  const res = JSON.stringify(users)
  return new Response(res, { status: 200 })
}

export async function POST(req: NextRequest) {
  const newUser: User = await req.json() // body

  const users = getUsers(usersPath)

  const newUsers = users.filter(
    user => user.name !== newUser.name
  )
  newUsers.push(newUser)

  const usersJson = JSON.stringify(newUsers, null, 2)
  fs.writeFileSync(usersPath, usersJson)

  const res = JSON.stringify({
    newUsers,
    message: `${newUser.name} added successfully`,
  })

  return new Response(res, { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userName = searchParams.get('userName')

  const users = getUsers(usersPath)
  const newUsers = users.filter(user => user.name !== userName)

  const newUsersJson = JSON.stringify(newUsers, null, 2)
  fs.writeFileSync(usersPath, newUsersJson)

  const res = JSON.stringify({
    users: newUsers,
    message: `${userName} deleted successfully`,
  })

  return new Response(res, { status: 200 })
}

function getUsers(usersPath: string) {
  const usersJson = fs.readFileSync(usersPath, 'utf8')
  const users = JSON.parse(usersJson)
  return users as User[]
}
