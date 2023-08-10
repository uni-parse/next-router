'use client'

import useSWR from 'swr'

export default function UserComponent({
  name,
}: {
  name: string
}) {
  const url = `/api/users?userName=${name}`

  const fetcher = async (url: URL) => {
    const res = await fetch(url)
    const data = await res.json()
    return data
  }

  const { data: user, error } = useSWR(url, fetcher)

  if (error) return <p>invalid userName / failed to load</p>
  if (!user) return <div>loading...</div>
  return (
    <details>
      <summary>{user.name}</summary>
      <ul>
        <li>money: {user.money}</li>
        <li>xp: {user.xp}</li>
      </ul>
    </details>
  )
}
