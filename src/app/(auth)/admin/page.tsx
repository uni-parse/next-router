import { Metadata } from 'next/types'
import UsersCSR from '@/components/usersCSR'
import UsersSSG from '@/components/usersSSG'

export const metadata: Metadata = {
  title: 'Admin',
  description:
    'admin panel to configurate users.json on database',
  robots: 'noindex,nofollow',
}

// we can't have ssg and ssr at the same time
// so we used iframe to simulate ssr

const page = () => (
  <>
    <h1 className='text-center'>Admin</h1>
    <UsersSSG />
    <UsersSSR />
    <UsersCSR />
  </>
)

export default page

function UsersSSR() {
  return (
    <iframe
      src='/usersSSR'
      title='sersSSR'
      frameBorder='0'
      className='m-0 h-[20.6em] w-[100%]'
    />
  )
}
