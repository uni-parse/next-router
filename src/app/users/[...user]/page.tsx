/* eslint-disable react/no-unescaped-entities */
import findUser from '@/lib/findUser'

interface Props {
  params: {
    user: string[]
  }
  searchParams: {
    [key: string]: string
    // ex ?color=teal&backgroundColor=darkorange
    // 'color': 'darkorange'
    // 'backgroundColor': 'teal'
  }
}

// ex http://localhost:3000/users/user1?color=darkorange&backgroundColor=teal

export default async function Page(props: Props) {
  const [userName, state] = props.params.user
  const css = props.searchParams
  const user = findUser(userName)

  if (!user)
    return (
      <h1 className='text-center' style={css}>
        UnDefined User: "{userName}"
      </h1>
    )

  const { name, money, xp } = user

  if (!state)
    return (
      <>
        <h1 className='text-center' style={css}>
          Hello {name} !!
        </h1>

        <h3>your status:</h3>
        <ul>
          <li>money: {money}$</li>
          <li>xp: {xp}</li>
        </ul>
      </>
    )

  if (!['money', 'xp'].includes(state))
    return (
      <>
        <h1 className='text-center' style={css}>
          Sorry {name}
        </h1>
        <h3 className='text-center'>
          but u don't have the state "{state}"
        </h3>
      </>
    )

  return (
    <>
      <h1 className='text-center' style={css}>
        Chacking {name} {state} !!
      </h1>
      <h3 className='text-center'>
        you have {state === 'money' ? `${money}$` : `${xp}xp`}
      </h3>
    </>
  )
}
