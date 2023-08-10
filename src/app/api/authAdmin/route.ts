import fs from 'fs'
import path from 'path'
import { NextRequest } from 'next/server'

const pwPath = path.join(process.cwd(), 'db', 'authAdmin.json')

// eslint-disable-next-line import/prefer-default-export
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userPw = searchParams.get('pw')

  const pwJson = fs.readFileSync(pwPath, 'utf8')
  const { pw: dataBasePw } = JSON.parse(pwJson)

  // validate password
  const access = userPw === dataBasePw

  const res = JSON.stringify({
    message: access
      ? 'Access Granted !!'
      : `"${userPw}" Are Invalid Password !!`,
  })

  return new Response(res, { status: access ? 200 : 404 })
}
